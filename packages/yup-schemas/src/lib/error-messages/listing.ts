import {
  LISTING_AMENITY_ARRAY_MIN,
  LISTING_AMENITY_VALUE_MAX,
  LISTING_AMENITY_VALUE_MIN,
  LISTING_BEDS_MIN,
  LISTING_CATEGORY_MAX,
  LISTING_DESCRIPTION_MAX,
  LISTING_GUESTS_MIN,
  LISTING_NAME_MAX,
  LISTING_NAME_MIN,
  LISTING_PRICE_MIN,
} from "../constants";

const nameErrorMessages = {
  tooShort: `Too short! Minimum of ${LISTING_NAME_MIN} characters in length`,
  tooLong: `Too long! Maximum of ${LISTING_NAME_MAX} characters in length`,
};

const categoryErrorMessages = {
  tooLong: `Too long! Maximum of ${LISTING_CATEGORY_MAX} characters in length`,
};

const descriptionErrorMessages = {
  tooLong: `Too long! Maximum of ${LISTING_DESCRIPTION_MAX} characters in length`,
};

const priceErrorMessages = {
  tooLittle: `Price per day must be at least ${LISTING_PRICE_MIN}`,
};

const bedsErrorMessages = {
  tooLittle: `Number of beds must be at least ${LISTING_BEDS_MIN}`,
};

const guestsErrorMessages = {
  tooLittle: `Maximum number of guests must be at least ${LISTING_GUESTS_MIN}`,
};

const amenitiesErrorMessages = {
  valueTooShort: `Too short! Minimum of ${LISTING_AMENITY_VALUE_MIN} characters in length`,
  valueTooLong: `Too short! Minimum of ${LISTING_AMENITY_VALUE_MAX} characters in length`,
  tooLittle: `You must select at least ${LISTING_AMENITY_ARRAY_MIN} amenities`,
};

export const listingErrorMessages = {
  name: {
    ...nameErrorMessages,
  },
  category: {
    ...categoryErrorMessages,
  },
  description: {
    ...descriptionErrorMessages,
  },
  price: {
    ...priceErrorMessages,
  },
  beds: {
    ...bedsErrorMessages,
  },
  guests: {
    ...guestsErrorMessages,
  },
  amenities: {
    ...amenitiesErrorMessages,
  },
};
