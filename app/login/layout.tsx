import type { Metadata } from "next";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen w-screen  overscroll-none overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
