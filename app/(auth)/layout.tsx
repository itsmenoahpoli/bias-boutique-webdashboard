import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0fb7d4] via-[#591293] to-[#0b0f1b] flex flex-col items-center gap-y-8 pt-[10%]">
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/images/brand-logo.png"
          alt="Brand Logo"
          width={150}
          height={150}
          className="select-none"
        />

        <h1 className="text-xl text-white">Bias Boutique Admin Dashboard</h1>
      </div>

      <div className="w-[400px]" style={{ zoom: 0.9 }}>
        {children}
      </div>
    </div>
  );
}
