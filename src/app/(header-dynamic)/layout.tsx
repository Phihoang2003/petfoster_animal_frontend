import Banner from "@/components/common/Banner";
import Footer from "@/components/common/common-footer/Footer";
import Header from "@/components/common/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Banner />
      <main className="">{children}</main>
      <Footer />
    </>
  );
}
