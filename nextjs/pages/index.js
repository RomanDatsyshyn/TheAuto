import Link from "next/link";
import { MainLayout } from "../components/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout title={"Home"}>
        <h1>Home</h1>
        <p>
          <Link href={"/about"}>
            <a>About</a>
          </Link>
        </p>
        <p>
          <Link href={"/article/777"}>
            <a>Article</a>
          </Link>
        </p>
      </MainLayout>
    </>
  );
}
