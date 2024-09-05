import ThemeRegistry from "@/theme/ThemeRegistry";
import "../styles/global.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>{children}</body>
      </ThemeRegistry>
    </html>
  );
}
