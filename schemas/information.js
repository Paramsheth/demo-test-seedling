import { FaInfo } from "react-icons/fa";
import moment from "moment";

export default {
  name: "information",
  title: "Information",
  icon: FaInfo,
  type: "document",
  fields: [
    {
      name: "title",
      title: " Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
      _updatedAt: "_updatedAt",
    },
    prepare(selection) {
      return {
        title: `${selection.title ? selection.title : "-"}`,
        subtitle: `last updated on ${moment(selection._updatedAt).format(
          "DD/MM/YYYY hh:mm a"
        )}`,
      };
    },
  },
};
