import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

export default function RootPage() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0fb7d4] via-[#591293] to-[#0b0f1b] flex flex-col items-center justify-center gap-y-3">
      <Image
        src="/images/brand-logo.png"
        alt="Brand Logo"
        width={200}
        height={200}
        className="select-none"
      />

      <Spin size="large" />
    </div>
  );
}
