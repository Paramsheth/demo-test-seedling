import { FaHighlighter } from "react-icons/fa";

export default {
  name: "featured",
  title: "News - Featured",
  icon: FaHighlighter,
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      type: "reference",
      name: "featured_news",
      title: "Select Featured News",
      to: { type: "news" },
    },
  ],
  preview: {
    select: {
      title: "featured_news.title",
    },
    prepare(selection) {
      return {
        title: "Featured News",
        subtitle: `${selection.title ? selection.title : "-"}`,
        description: "",
      };
    },
  },
};
