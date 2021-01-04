import { FaShoppingBag } from "react-icons/fa";
import moment from "moment";

export default {
  name: "shop",
  title: "Shop - List",
  icon: FaShoppingBag,
  type: "document",
  fields: [
    {
      name: "name",
      title: "Shop Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Shop Category",
      type: "reference",
      to: {
        type: "shop_category",
      },
    },
    {
      type: "text",
      name: "description",
      title: "Description",
      description: "(up to 120 characters)",
      validation: (Rule) => Rule.required().max(120),
      rows: 2,
    },
    {
      type: "image",
      name: "shop_image",
      title: "Shop Image",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Is Shop Open?",
      name: "open",
      validation: (Rule) => Rule.required(),
      type: "boolean",
    },
    {
      title: "Website",
      name: "website",
      type: "url",
    },
    {
      title: "Phone Number",
      name: "mobile",
      type: "string",
    },
    {
      title: "Google Place Link",
      name: "place_link",
      type: "url",
    },
  ],
  initialValue: () => ({
    open: false,
  }),
  preview: {
    select: {
      title: "name",
      _updatedAt: "_updatedAt",
      media: "shop_image",
    },
    prepare(selection) {
      return {
        media: selection.media,
        title: `${selection.title ? selection.title : "-"}`,
        subtitle: `last updated on ${moment(selection._updatedAt).format(
          "DD/MM/YYYY hh:mm a"
        )}`,
        description: "",
      };
    },
  },
};
