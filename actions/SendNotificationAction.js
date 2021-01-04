import React from "react";
import { useDocumentOperation } from "@sanity/react-hooks";
import "isomorphic-fetch";

export function SendNotificationAction(props) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const [loading, setLoading] = React.useState(false);

  let big_picture = null;

  if (
    props.published &&
    props.published.image_asset &&
    props.published.image_asset.asset
  ) {
    let splitted = props.published.image_asset.asset._ref.split("-");

    var joinedArray = splitted.slice(1, splitted.length - 1).join("-");

    big_picture = `https://cdn.sanity.io/images/${
      process.env.SANITY_STUDIO_API_PROJECT_ID
    }/${process.env.SANITY_STUDIO_API_DATASET}/${joinedArray}.${
      splitted[splitted.length - 1]
    }`;
  }

  const publishDocument = (stats) => {
    return new Promise(async (resolve, reject) => {
      try {
        let patchArray = Object.keys(props.published).map((key) => {
          return { set: { [key]: props.published[key] } };
        });

        patchArray.push({ set: { notified: true } });

        patchArray.push({
          set: {
            big_picture: big_picture || "",
          },
        });

        patchArray.push({
          set: {
            stats,
          },
        });

        await patch.execute(patchArray);

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const sendNotification = (inputValues) => {
    const data = {
      app_id: process.env.SANITY_STUDIO_APP_ID,

      included_segments:
        process.env.SANITY_STUDIO_ENV === "development"
          ? ["Test Users"]
          : ["All"],

      big_picture: big_picture,
      data: {
        title: inputValues.title,
        description: inputValues.description,
        launch_url: inputValues.launch_url,
      },
      contents: {
        en: inputValues.description,
      },
      ios_attachments: {
        picture: big_picture,
      },
      content_available: true,
      headings: {
        en: inputValues.title,
      },
    };

    return new Promise((resolve, reject) => {
      fetch(`https://onesignal.com/api/v1/notifications`, {
        method: "post",
        headers: {
          "Content-type": "application/json; charset=utf-8",
          Authorization: `Basic ${process.env.SANITY_STUDIO_ONESIGNAL_AUTH_TOKEN}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    label: "Send Notification",
    disabled: loading || !props.published,
    onHandle: () => {
      setLoading(true);

      sendNotification(props.published)
        .then((response) => {
          publishDocument(response)
            .then(() => {
              setLoading(false);
              props.onComplete();
            })
            .catch((e) => {
              setLoading(false);
            });
        })
        .catch((e) => {
          setLoading(false);
        });
    },
  };
}
