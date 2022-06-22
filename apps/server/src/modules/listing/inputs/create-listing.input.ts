import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, Float, InputType, Int } from "type-graphql";
import { Listing } from "../../../entity";

@InputType()
/**
 * Represents Create Listing input type.
 */
export class CreateListingInput implements Partial<Listing> {
  [key: string]: unknown;

  @Field(() => GraphQLUpload)
  photo!: Promise<FileUpload>;

  @Field()
  name!: string;

  @Field()
  category!: string;

  @Field()
  description!: string;

  @Field(() => Int)
  pricePerDay!: number;

  @Field(() => Int)
  numberOfBeds!: number;

  @Field(() => Int)
  maxNumberOfGuests!: number;

  @Field(() => [String])
  amenities!: string[];

  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;
}
