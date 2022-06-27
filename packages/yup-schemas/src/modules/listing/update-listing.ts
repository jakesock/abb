import * as Yup from "yup";
import { OptionalArraySchema } from "yup/lib/array";
import { AnyObject } from "yup/lib/types";
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

export const updateListingSchema = Yup.object().shape({
  id: Yup.string().uuid("Invalid Listing Identifier").required(message.common.required),
  photo: Yup.mixed().nullable(),
  name: Yup.string()
    .min(LISTING_NAME_MIN, message.listing.name.tooShort)
    .max(LISTING_NAME_MAX, message.listing.name.tooLong)
    .optional(),
  category: Yup.string().max(LISTING_CATEGORY_MAX, message.listing.category.tooLong).optional(),
  description: Yup.string()
    .max(LISTING_DESCRIPTION_MAX, message.listing.description.tooLong)
    .optional(),
  pricePerDay: Yup.number().min(LISTING_PRICE_MIN, message.listing.price.tooLittle).optional(),
  numberOfBeds: Yup.number().min(LISTING_BEDS_MIN, message.listing.beds.tooLittle).optional(),
  maxNumberOfGuests: Yup.number()
    .min(LISTING_GUESTS_MIN, message.listing.guests.tooLittle)
    .optional(),
  amenities: Yup.array()
    .of(
      Yup.string()
        .min(LISTING_AMENITY_VALUE_MIN, message.listing.amenities.valueTooShort)
        .max(LISTING_AMENITY_VALUE_MAX, message.listing.amenities.valueTooLong)
    )
    .min(LISTING_AMENITY_ARRAY_MIN, message.listing.amenities.tooLittle)
    .optional() as OptionalArraySchema<
    Yup.StringSchema<string | undefined, AnyObject, string | undefined>,
    AnyObject,
    (string | undefined)[] | undefined
  >,
  latitude: Yup.number().optional(),
  longitude: Yup.number().optional(),
});
