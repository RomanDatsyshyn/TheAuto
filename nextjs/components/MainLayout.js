import Head from "next/head";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function MainLayout({ children, title = "" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
