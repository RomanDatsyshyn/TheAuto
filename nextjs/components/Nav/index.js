import Link from "next/link";

export default function Nav({ menuCategories }) {
  return (
    <nav>
      {menuCategories.data.map((category, index) => {
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
