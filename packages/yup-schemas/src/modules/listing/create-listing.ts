import * as Yup from "yup";
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
} from "../../lib/constants";
import { message } from "../../lib/error-messages";

export const createListingSchema = Yup.object().shape({
  photo: Yup.object().required(message.common.required),
  name: Yup.string()
    .min(LISTING_NAME_MIN, message.listing.name.tooShort)
    .max(LISTING_NAME_MAX, message.listing.name.tooLong)
    .required(message.common.required),
  category: Yup.string()
    .max(LISTING_CATEGORY_MAX, message.listing.category.tooLong)
    .required(message.common.required),
  description: Yup.string()
    .max(LISTING_DESCRIPTION_MAX, message.listing.description.tooLong)
    .required(message.common.required),
  pricePerDay: Yup.number()
    .min(LISTING_PRICE_MIN, message.listing.price.tooLittle)
    .required(message.common.required),
  numberOfBeds: Yup.number()
    .min(LISTING_BEDS_MIN, message.listing.beds.tooLittle)
    .required(message.common.required),
  maxNumberOfGuests: Yup.number()
    .min(LISTING_GUESTS_MIN, message.listing.guests.tooLittle)
    .required(message.common.required),
  amentities: Yup.array()
    .of(
      Yup.string()
        .min(LISTING_AMENITY_VALUE_MIN, message.listing.amenities.valueTooShort)
        .max(LISTING_AMENITY_VALUE_MAX, message.listing.amenities.valueTooLong)
    )
    .min(LISTING_AMENITY_ARRAY_MIN, message.listing.amenities.tooLittle)
    .required(message.common.required),
  latitude: Yup.number().required(message.common.required),
  longitude: Yup.number().required(message.common.required),
});
