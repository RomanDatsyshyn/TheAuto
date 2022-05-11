import { useRouter } from "next/router";
import { MainLayout } from "../../components/MainLayout";

export default function Article() {
  const router = useRouter();

  return (
    <MainLayout>
      <h1>Article {router.query.id}</h1>
    </MainLayout>
  );
}
