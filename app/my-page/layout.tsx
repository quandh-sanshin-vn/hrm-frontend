export default function MyPageScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen w-screen flex flex-1 overscroll-none overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
