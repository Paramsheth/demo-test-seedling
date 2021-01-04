const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  token: `Bearer ${process.env.SANITY_STUDIO_WRITE_TOKEN}`, // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
});
export default client;
