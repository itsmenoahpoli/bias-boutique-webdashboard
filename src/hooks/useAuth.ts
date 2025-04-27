import { useAuthStore } from "../store/useAuthStore";
import { useAuthService } from "../services/auth.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useAuth = () => {
  const { signinUser } = useAuthService();
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
  const navigate = useNavigate();
  const signin = async (credentials: { email: string; password: string }) => {
    return signinUser(credentials)
      .then((response) => {
        const { user, token } = response.data.data;
        setAuth(user, token);
        navigate("/"); // Handle redirect in the hook
        toast.success("Successfully signed in!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to sign in");
        throw error;
      });
  };

  return {
    user,
    token,
    isAuthenticated,
    signin,
    logout,
  };
};
