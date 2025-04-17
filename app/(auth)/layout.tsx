export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0fb7d4] via-[#591293] to-[#0b0f1b] flex flex-col items-center justify-center gap-y-3">
      {children}
    </div>
  );
}
