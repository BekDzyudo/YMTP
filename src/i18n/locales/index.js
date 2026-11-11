// Har bir kalit: { uz, ru, en }. Tarjima topilmasa o'zbekcha matn ishlatiladi.
import common from "./common.js";
import home from "./home.js";
import institut from "./institut.js";
import news from "./news.js";
import resources from "./resources.js";
import auth from "./auth.js";
import contact from "./contact.js";
import colleges from "./colleges.js";
import profile from "./profile.js";
import misc from "./misc.js";

const messages = {
  ...common,
  ...home,
  ...institut,
  ...news,
  ...resources,
  ...auth,
  ...contact,
  ...colleges,
  ...profile,
  ...misc,
};

export default messages;
