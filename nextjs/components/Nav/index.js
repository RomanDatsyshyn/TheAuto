import Link from "next/link";

export default function Nav({ menuCategories }) {
  return (
    <nav className="nav">
      <Link href={"/article/all"}>
        <a>Всі статті</a>
      </Link>
      {menuCategories &&
        menuCategories.data &&
        menuCategories.data.map((category, index) => {
          const { name, identificator } = category.attributes;
          return (
            <Link
              href={"/category/[id]"}
              as={`/category/${identificator}`}
              key={index}
            >
              <a>{name}</a>
            </Link>
          );
        })}
    </nav>
  );
}
