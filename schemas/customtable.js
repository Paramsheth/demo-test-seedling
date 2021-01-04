import React from "react";
import { FaTable } from "react-icons/fa";
import CustomRadioGroup from "../component/CustomRadioGroup";

const Preview = () => {
  return (
    <div
      style={{
        padding: "17px 0px 15px 12px",
      }}
    >
      <FaTable /> &nbsp;Table{" "}
    </div>
  );
};

export default {
  name: "customtable",
  title: "Table",
  type: "object",
  fields: [
    {
      name: "fixed_row",
      type: "string",
      inputComponent: CustomRadioGroup,
      options: {
        list: [
          { title: "yes", value: "true" },
          { title: "no", value: "false" },
        ],
        name: "fixed_row",
      },
    },
    {
      name: "fixed_column",
      type: "string",
      inputComponent: CustomRadioGroup,
      options: {
        list: [
          { title: "yes", value: "true" },
          { title: "no", value: "false" },
        ],
        name: "fixed_column",
      },
    },
    {
      name: "table",
      type: "table",
      title: "Table",
    },
  ],
  preview: {
    component: Preview,
  },
};
