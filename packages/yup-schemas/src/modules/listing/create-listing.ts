import * as Yup from "yup";
import {
  LISTING_AMENITY_ARRAY_MIN,
  LISTING_AMENITY_VALUE_MAX,
  LISTING_AMENITY_VALUE_MIN,
  LISTING_BEDS_MAX,
  LISTING_BEDS_MIN,
  LISTING_CATEGORY_MAX,
  LISTING_DESCRIPTION_MAX,
  LISTING_GUESTS_MAX,
  LISTING_GUESTS_MIN,
  LISTING_PRICE_MIN,
  LISTING_TITLE_MAX,
  LISTING_TITLE_MIN,
} from "../../lib/constants";
import { message } from "../../lib/error-messages";

export const createListingSchema = Yup.object().shape({
  photo: Yup.mixed().nullable(),
  title: Yup.string()
    .min(LISTING_TITLE_MIN, message.listing.title.tooShort)
    .max(LISTING_TITLE_MAX, message.listing.title.tooLong)
    .required(message.common.required),
  description: Yup.string()
    .max(LISTING_DESCRIPTION_MAX, message.listing.description.tooLong)
    .required(message.common.required),
  pricePerNight: Yup.number()
    .min(LISTING_PRICE_MIN, message.listing.price.tooLittle)
    .required(message.common.required),
  numberOfGuests: Yup.number()
    .min(LISTING_GUESTS_MIN, message.listing.guests.tooLittle)
    .max(LISTING_GUESTS_MAX, message.listing.guests.tooLarge)
    .required(message.common.required),
  numberOfBeds: Yup.number()
    .min(LISTING_BEDS_MIN, message.listing.beds.tooLittle)
    .max(LISTING_BEDS_MAX, message.listing.beds.tooLarge)
    .required(message.common.required),
  category: Yup.string()
    .max(LISTING_CATEGORY_MAX, message.listing.category.tooLong)
    .required(message.common.required),
  isPetFriendly: Yup.boolean().required(message.common.required),
  hasSecurityCamera: Yup.boolean().required(message.common.required),
  hasWeapons: Yup.boolean().required(message.common.required),
  hasDangerousAnimals: Yup.boolean().required(message.common.required),
  latitude: Yup.number().required(message.common.required),
  longitude: Yup.number().required(message.common.required),
  amenities: Yup.array()
    .of(
      Yup.string()
        .min(LISTING_AMENITY_VALUE_MIN, message.listing.amenities.valueTooShort)
        .max(LISTING_AMENITY_VALUE_MAX, message.listing.amenities.valueTooLong)
    )
    .min(LISTING_AMENITY_ARRAY_MIN, message.listing.amenities.tooLittle)
    .required(message.common.required),
});
