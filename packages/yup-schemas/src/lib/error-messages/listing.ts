import {
  LISTING_AMENITY_ARRAY_MIN,
  LISTING_AMENITY_VALUE_MAX,
  LISTING_AMENITY_VALUE_MIN,
  LISTING_BATHROOMS_MAX,
  LISTING_BATHROOMS_MIN,
  LISTING_BEDROOMS_MAX,
  LISTING_BEDROOMS_MIN,
  LISTING_BEDS_MAX,
  LISTING_BEDS_MIN,
  LISTING_CATEGORY_MAX,
  LISTING_DESCRIPTION_MAX,
  LISTING_GUESTS_MAX,
  LISTING_GUESTS_MIN,
  LISTING_PRICE_MIN,
  LISTING_TITLE_MAX,
  LISTING_TITLE_MIN,
} from "../constants";

const titleErrorMessages = {
  tooShort: `Too short! Minimum of ${LISTING_TITLE_MIN} characters in length`,
  tooLong: `Too long! Maximum of ${LISTING_TITLE_MAX} characters in length`,
};

const descriptionErrorMessages = {
  tooLong: `Too long! Maximum of ${LISTING_DESCRIPTION_MAX} characters in length`,
};

const priceErrorMessages = {
  tooLittle: `Price per day must be at least ${LISTING_PRICE_MIN}`,
};

const guestsErrorMessages = {
  tooLittle: `Number of guests must be at least ${LISTING_GUESTS_MIN}`,
  tooLarge: `Number of guests must be at most ${LISTING_GUESTS_MAX}`,
};

const bedsErrorMessages = {
  tooLittle: `Number of beds must be at least ${LISTING_BEDS_MIN}`,
  tooLarge: `Number of beds must be at most ${LISTING_BEDS_MAX}`,
};

const bedroomsErrorMessages = {
  tooLittle: `Number of bedrooms must be at least ${LISTING_BEDROOMS_MIN}`,
  tooLarge: `Number of bedrooms must be at most ${LISTING_BEDROOMS_MAX}`,
};

const bathroomsErrorMessages = {
  tooLittle: `Number of bathrooms must be at least ${LISTING_BATHROOMS_MIN}`,
  tooLarge: `Number of bathrooms must be at most ${LISTING_BATHROOMS_MAX}`,
};

const categoryErrorMessages = {
  tooLong: `Too long! Maximum of ${LISTING_CATEGORY_MAX} characters in length`,
};

const amenitiesErrorMessages = {
  valueTooShort: `Too short! Minimum of ${LISTING_AMENITY_VALUE_MIN} characters in length`,
  valueTooLong: `Too short! Minimum of ${LISTING_AMENITY_VALUE_MAX} characters in length`,
  tooLittle: `You must provide at least ${LISTING_AMENITY_ARRAY_MIN} amenity/amenities`,
};

export const listingErrorMessages = {
  title: {
    ...titleErrorMessages,
  },
  description: {
    ...descriptionErrorMessages,
  },
  price: {
    ...priceErrorMessages,
  },
  guests: {
    ...guestsErrorMessages,
  },
  beds: {
    ...bedsErrorMessages,
  },
  bedrooms: {
    ...bedroomsErrorMessages,
  },
  bathrooms: {
    ...bathroomsErrorMessages,
  },
  category: {
    ...categoryErrorMessages,
  },
  amenities: {
    ...amenitiesErrorMessages,
  },
};
