import { useRouter } from "next/router";
import "../styles.css";
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return <Component {...pageProps} key={router.asPath} />;
}
