import { commonErrorMessages } from "./common";
import { listingErrorMessages } from "./listing";
import { userErrorMessages } from "./user";

export const message = {
  common: {
    ...commonErrorMessages,
  },
  user: {
    ...userErrorMessages,
  },
  listing: {
    ...listingErrorMessages,
  },
};
