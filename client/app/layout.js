import "./globals.css";

export const metadata = {
  title: "آزمون سنجش ریسک",
  description: "گروه خدماتی بازارسرمایه سهم آشنا",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
