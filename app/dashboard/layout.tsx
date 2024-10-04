export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1, user-scalable=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}
