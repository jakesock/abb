import { Field, ObjectType } from "type-graphql";
import { Listing } from "../../entity";
import { FieldError } from "./field-error";

@ObjectType()
/**
 * Represents ListingFormResponse, a GraphQL object type for form responses related to
 * listing actions (Create, update, etc).
 */
export class ListingFormResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Listing, { nullable: true })
  listing?: Listing;
}
