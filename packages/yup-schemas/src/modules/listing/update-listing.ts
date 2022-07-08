import * as Yup from "yup";
import { OptionalArraySchema } from "yup/lib/array";
import { AnyObject } from "yup/lib/types";
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

export const updateListingSchema = Yup.object().shape({
  id: Yup.string().uuid("Invalid Listing Identifier").required(message.common.required),
  photo: Yup.mixed().nullable(),
  title: Yup.string()
    .min(LISTING_TITLE_MIN, message.listing.title.tooShort)
    .max(LISTING_TITLE_MAX, message.listing.title.tooLong)
    .optional(),
  description: Yup.string()
    .max(LISTING_DESCRIPTION_MAX, message.listing.description.tooLong)
    .optional(),
  pricePerNight: Yup.number().min(LISTING_PRICE_MIN, message.listing.price.tooLittle).optional(),
  numberOfGuests: Yup.number()
    .min(LISTING_GUESTS_MIN, message.listing.guests.tooLittle)
    .max(LISTING_GUESTS_MAX, message.listing.guests.tooLarge)
    .optional(),
  numberOfBeds: Yup.number()
    .min(LISTING_BEDS_MIN, message.listing.beds.tooLittle)
    .max(LISTING_BEDS_MAX, message.listing.beds.tooLarge)
    .optional(),
  category: Yup.string().max(LISTING_CATEGORY_MAX, message.listing.category.tooLong).optional(),
  latitude: Yup.number().optional(),
  longitude: Yup.number().optional(),
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
});
