import defaultResolve, {
  DeleteAction,
  PublishAction,
  UnpublishAction,
} from "part:@sanity/base/document-actions";

import { CustomNotifyContentAction } from "../actions/CustomNotifyAction";
import { SendNotificationAction } from "../actions/SendNotificationAction";

export default function resolveDocumentActions(props) {
  if (props.type === "notification_history") {
    if (props.published && props.published.notified) {
      return [DeleteAction];
    }

    return [SendNotificationAction, DeleteAction];
  }

  if (
    props.type === "featured" ||
    props.type === "exclusive" ||
    props.type === "shop_landing"
  ) {
    return [PublishAction, UnpublishAction];
  }

  return [...defaultResolve(props), CustomNotifyContentAction];
}
