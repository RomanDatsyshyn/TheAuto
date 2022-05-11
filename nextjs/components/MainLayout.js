import Head from "next/head";

export function MainLayout({ children, title = "" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav>
        <h1>Navigation</h1>
      </nav>
      <main>{children}</main>
    </>
  );
}
