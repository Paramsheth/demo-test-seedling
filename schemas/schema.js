// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import youtube from "./youtube";
import news from "./news";
import highlighted from "./highlighted";
import covid from "./covid";
import travel from "./travel";
import information from "./information";
import shopping from "./shopping";
import shoppingLanding from "./shoppingLanding";
import shopCategory from "./shopCategory";
import notification from "./notification";
import stats from "./stats";
import exclusive from "./exclusive";
import customtable from "./customtable";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    news,
    highlighted,
    exclusive,
    category,
    covid,
    travel,
    information,
    youtube,
    blockContent,
    shoppingLanding,
    shopping,
    shopCategory,
    notification,
    stats,
    customtable,
  ]),
});
