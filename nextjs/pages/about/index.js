import Router from "next/router";
import { MainLayout } from "../../components/MainLayout";

export default function About() {
  const linkClickHandler = () => {
    Router.push("/");
  };

  return (
    <MainLayout>
      <h1>About page</h1>

      <button onClick={linkClickHandler}>Go back to Home</button>
      <button onClick={() => Router.push("/")}>Go back to Home</button>
    </MainLayout>
  );
}
