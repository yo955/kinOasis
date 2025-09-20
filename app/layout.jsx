import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <>
          <main className="w-full min-h-screen">{children}</main>
        </>
      </body>
    </html>
  );
}
