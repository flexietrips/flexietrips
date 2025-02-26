import { Fragment } from "react";
import Counter from "./Counter";

const SectionTitle = ({
  title,
  highlight, // New prop for colored span
  countValue = 34500,
  subtitle2 = "most popular experience you’ll remember",
  bg,
  color = "red", // Default color for span
}) => {
  return (
    <Fragment>
      <h2>
        {title} {highlight && <span style={{ color }}>{highlight}</span>}
      </h2>
      <p>{subtitle2}</p>
    </Fragment>
  );
};

export default SectionTitle;
