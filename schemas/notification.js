import moment from "moment";
import React from "react";
import { FaBell } from "react-icons/fa";
import customCss from "../styles/custom-notify.css";

function DisableOtherField(props) {
  React.useEffect(() => {
    if (props.value) {
      document
        .querySelector('div[data-focus-path="title"]')
        .querySelector("input")
        .setAttribute("disabled", props.value);
      document
        .querySelector('div[data-focus-path="description"]')
        .querySelector("textarea")
        .setAttribute("disabled", props.value);
      document
        .querySelector('div[data-focus-path="launch_url"]')
        .querySelector("input")
        .setAttribute("disabled", props.value);

      document.querySelector(
        'div[data-focus-path="image_asset"]'
      ).style.display = "none";
    } else {
      document
        .querySelector('div[data-focus-path="title"]')
        .querySelector("input")
        .removeAttribute("disabled");
      document
        .querySelector('div[data-focus-path="description"]')
        .querySelector("textarea")
        .removeAttribute("disabled");
      document
        .querySelector('div[data-focus-path="launch_url"]')
        .querySelector("input")
        .removeAttribute("disabled");
      document.querySelector(
        'div[data-focus-path="image_asset"]'
      ).style.display = "";
    }
  }, [props.value]);
  return null;
}

export default {
  name: "notification_history",
  title: "Notification",
  icon: FaBell,
  type: "document",
  __experimental_actions: ["delete", "update", "create"],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "launch_url",
      title: "Launch URL",
      type: "url",
    },
    {
      name: "notified",
      title: "Is Notified ?",
      type: "boolean",
      inputComponent: DisableOtherField,
    },
    {
      name: "stats",
      title: "Stastics",
      type: "stats",
      hidden: true,
    },
    {
      name: "image_asset",
      title: "Image",
      type: "image",
    },
    {
      name: "big_picture",
      title: "Image",
      type: "string",
      inputComponent: (url) => {
        const { value } = url;

        if (value && value.length > 0) {
          return (
            <div className={customCss["mt-50"]}>
              <label className={customCss.label}> Image</label>
              <img className={customCss.big_picture} src={value} />
            </div>
          );
        }
        return null;
      },
    },
    {
      name: "notification_type",
      type: "string",
      hidden: true,
    },
  ],
  liveEdit: true,
  initialValue: () => ({
    notified: false,
    notification_type: "custom",
  }),
  preview: {
    select: {
      title: "title",
      _updatedAt: "_updatedAt",
      notified: "notified",
    },
    prepare(selection) {
      return {
        title: `${selection.title ? selection.title : "-"}`,
        subtitle: `${
          selection.notified
            ? `notified on ${moment(selection._updatedAt).format(
                "DD/MM/YYYY hh:mm a"
              )}`
            : ""
        }`,
      };
    },
  },
};
