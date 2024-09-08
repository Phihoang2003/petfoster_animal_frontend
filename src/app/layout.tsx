import ThemeRegistry from "@/theme/ThemeRegistry";
import "../styles/global.css";
import { ToastProvider } from "@/providers";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}
