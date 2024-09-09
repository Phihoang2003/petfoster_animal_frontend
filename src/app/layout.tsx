import ThemeRegistry from "@/theme/ThemeRegistry";
import "../styles/global.css";
import { ToastProvider } from "@/providers";
import { Providers } from "@/redux/provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <ThemeRegistry>
          <body>
            <ToastProvider>{children}</ToastProvider>
          </body>
        </ThemeRegistry>
      </Providers>
    </html>
  );
}
