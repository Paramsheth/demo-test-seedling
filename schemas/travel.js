import { FaBus } from "react-icons/fa";
import moment from "moment";

export default {
  name: "travel_information",
  title: "Travel",
  icon: FaBus,
  type: "document",
  fields: [
    {
      name: "title",
      title: " Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "thumbnail_image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
