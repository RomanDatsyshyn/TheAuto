import styles from "./ArticlesContainer.module.css";
import { Heading } from "../Heading";
import { ShowMoreButton } from "../ShowMoreButton";

export function ArticlesContainer({ title = "" }) {
  return (
    <>
      <Heading titile={title} />
      <ShowMoreButton />
    </>
  );
}
