import category from "../static/category.png";
import React from "react";

const categoryIcon = () => {
  return (
    <React.Fragment>
      <img
        src={category}
        style={{
          width: "25px",
          height: "25px",
        }}
      />
    </React.Fragment>
  );
};

export default {
  name: "category",
  title: "News - Categories",
  icon: categoryIcon,
  type: "document",
  fields: [
    {
      name: "name",
      title: "Title",
      type: "string",
    },
  ],
};
