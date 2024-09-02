import Banner from "@/components/common/Banner";
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
    </>
  );
}
