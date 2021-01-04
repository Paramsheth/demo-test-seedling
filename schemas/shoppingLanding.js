import { FaChartBar } from "react-icons/fa";
import moment from "moment";

export default {
  name: "shop_landing",
  title: "Shop - Main Page",
  icon: FaChartBar,
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      type: "blockContent",
      name: "description",
      title: "Description",
    },
  ],
  preview: {
    select: {
      _updatedAt: "_updatedAt",
    },
    prepare(selection) {
      return {
        title: "Shopping Main Page",
        subtitle: `last updated on ${moment(selection._updatedAt).format(
          "DD/MM/YYYY hh:mm a"
        )}`,
      };
    },
  },
};
