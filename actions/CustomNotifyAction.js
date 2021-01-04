import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaBell } from "react-icons/fa";
import { useForm } from "react-hook-form";
import CustomCss from "../styles/custom-notify.css";
import myConfiguredSanityClient from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";

import "isomorphic-fetch";

const showCustomNotify = {
  news: true,
  covid: true,
  travel_information: true,
};

function createDocument(props, inputValues, stats) {
  const mutations = [
    {
      create: {
        _type: "notification_history",
        title: inputValues.title,
        description: inputValues.description,
        launch_url: `${process.env.SANITY_STUDIO_BASEURL}${props.type};${props.id}`,
        big_picture: inputValues.big_picture,
        notified: true,
        stats,
        notification_type: "reference",
      },
    },
  ];

  return new Promise((resolve, reject) => {
    fetch(
      `https://${process.env.SANITY_STUDIO_API_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.SANITY_STUDIO_API_DATASET}?returnDocuments=true`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_STUDIO_WRITE_TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function sendNotification(props, inputValues) {
  const data = {
    app_id: process.env.SANITY_STUDIO_APP_ID,

    included_segments:
      process.env.SANITY_STUDIO_ENV === "development"
        ? ["Test Users"]
        : ["All"],
    big_picture: inputValues.big_picture,
    data: {
      title: inputValues.title,
      description: inputValues.description,
      launch_url: `${process.env.SANITY_STUDIO_BASEURL}${props.type};${props.id}`,
    },
    ios_attachments: {
      picture: inputValues.big_picture,
    },
    contents: {
      en: inputValues.description,
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
        if (result && result.errors) {
          reject(result);
        } else {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function CustomNotifyContentAction(props) {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [error, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const builder = imageUrlBuilder(myConfiguredSanityClient);

  const onSubmit = (values) => {
    setLoading(true);

    sendNotification(props, values)
      .then((response) => {
        createDocument(props, values, response)
          .then((response) => {
            setLoading(false);
            setDialogOpen(false);
            props.onComplete();
          })
          .catch((e) => {
            setLoading(false);
          });
      })
      .catch((e) => {
        setLoading(false);
        setErrorMessage(e.errors[0]);
      });
  };

  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      title: props.published
        ? props.published.title
          ? props.published.title
          : ""
        : "",
      description: props.published
        ? props.published.short_description
          ? props.published.short_description
          : ""
        : "",
      big_picture: props.published
        ? props.published.thumbnail_image
          ? builder.image(props.published.thumbnail_image)
          : ""
        : "",
    },
  });

  if (showCustomNotify[props.type]) {
    return {
      label: "Notify Users",
      disabled: !props.published || props.draft,
      onHandle: () => {
        setDialogOpen(true);
      },
      dialog: isDialogOpen && {
        type: "modal",
        showCloseButton: false,

        content: (
          <>
            {loading ? (
              <div className={CustomCss.center}>
                <ClipLoader size={70} color={"#123abc"} loading={true} />
                <p>Notifying ...</p>
              </div>
            ) : !error ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Notify Users</h1>

                <label className={CustomCss.label}>title</label>
                <input
                  name="title"
                  className={`${CustomCss.label_field} DefaultTextInput_input_2wVzD text-input_textInput_31n9_ text-input_root_1xAqy`}
                  ref={register({
                    required: "Title Required",
                  })}
                />
                {errors.title && (
                  <p className={CustomCss.error}> {errors.title.message}</p>
                )}

                <label className={CustomCss.label}>description</label>
                <textarea
                  rows={4}
                  className={`${CustomCss.label_field} DefaultTextArea_textarea_PsxpM textarea_root_5hM3m text-input_textInput_31n9_ text-input_root_1xAqy`}
                  name="description"
                  ref={register({})}
                />
                {errors.description && (
                  <p className={CustomCss.error}>
                    {errors.description.message}
                  </p>
                )}

                <label className={CustomCss.label}>Image URL</label>
                <input
                  name="big_picture"
                  className={`${CustomCss.label_field} DefaultTextInput_input_2wVzD text-input_textInput_31n9_ text-input_root_1xAqy`}
                  ref={register()}
                />

                <div className={CustomCss["mt-27"]}>
                  <button
                    className={`${CustomCss.notify_btn} DefaultButton_color__primary_2vUAp`}
                    type="submit"
                  >
                    Notify
                  </button>
                  <button
                    className={CustomCss.cancel_btn}
                    type="button"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className={`${CustomCss.center} ${CustomCss.error}`}>
                  Error !!
                </div>
                <div
                  className={`${CustomCss.center} ${CustomCss.error} ${CustomCss["mt-27"]}`}
                >
                  {error}{" "}
                </div>
                <div className={`${CustomCss.center} ${CustomCss["mt-27"]}`}>
                  <button
                    className={`${CustomCss.cancel_btn}`}
                    onClick={() => {
                      setDialogOpen(false);
                      setErrorMessage(null);
                      props.onComplete();
                    }}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ),
      },
      icon: FaBell,
    };
  }
  return null;
}
