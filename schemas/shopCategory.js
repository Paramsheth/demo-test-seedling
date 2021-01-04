import { MdDomain } from "react-icons/md";

export default {
  name: "shop_category",
  type: "document",
  icon: MdDomain,
  title: "Shop - Categories",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
  ],
};
