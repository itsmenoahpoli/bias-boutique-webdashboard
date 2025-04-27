import $httpClient from "./api.service";

interface ProductData {
  name: string;
  category: string;
  description: string;
  stock: number;
  price: number;
  image?: File;
}

export const useProductsService = () => {
  const getProducts = async () => {
    return await $httpClient.get("/products");
  };

  const getProduct = async (id: string) => {
    return await $httpClient.get(`/products/${id}`);
  };

  const createProduct = async (product: ProductData) => {
    const formData = new FormData();

    // Append each field individually instead of stringifying the whole object
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("stock", product.stock.toString());
    formData.append("price", product.price.toString());

    // Append the actual File object, not a stringified version
    if (product.image) {
      formData.append("image", product.image);
    }

    return await $httpClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const updateProduct = async (id: string, product: any) => {
    return await $httpClient.put(`/products/${id}`, product);
  };

  const deleteProduct = async (id: string) => {
    return await $httpClient.delete(`/products/${id}`);
  };

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
