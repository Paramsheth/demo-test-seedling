import { FaNewspaper } from "react-icons/fa";
import moment from "moment";

export default {
  name: "news",
  title: "News - List",
  icon: FaNewspaper,
  type: "document",
  fields: [
    {
      name: "title",
      title: "News Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "thumbnail_image",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      type: "reference",
      name: "category",
      title: "News Category",
      to: { type: "category" },
    },
    {
      type: "text",
      name: "short_description",
      title: "Short Description",
      description: "(short description will be visible over the featured news)",
      rows: 2,
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
      media: "thumbnail_image",
      _updatedAt: "_updatedAt",
    },
    prepare(selection) {
      return {
        title: `${selection.title ? selection.title : "-"}`,
        subtitle: `last updated on ${moment(selection._updatedAt).format(
          "DD/MM/YYYY hh:mm a"
        )}`,
        media: selection.media,
        description: "",
      };
    },
  },
};
