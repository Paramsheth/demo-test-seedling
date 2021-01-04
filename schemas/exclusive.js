import { FaHighlighter } from "react-icons/fa";

export default {
  name: "exclusive",
  title: "News - Exclusive",
  icon: FaHighlighter,
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      type: "reference",
      name: "exclusive_news",
      title: "Select Exclusive News",
      to: { type: "news" },
    },
  ],

  preview: {
    select: {
      title: "exclusive_news.title",
    },
    prepare(selection) {
      return {
        title: "Exclusive News",
        subtitle: `${selection.title ? selection.title : "-"}`,
        description: "",
      };
    },
  },
};
