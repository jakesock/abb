import { Field, InputType } from "type-graphql";
import { User } from "../../../entity";
import { PasswordInput } from "./shared";

@InputType()
/**
 * Represents Register User input type.
 */
export class RegisterUserInput extends PasswordInput implements Partial<User> {
  [key: string]: unknown;

  // Username
  @Field()
  username!: string;

  // First name
  @Field()
  firstName!: string;

  // Middle name
  @Field({ nullable: true })
  middleName?: string;

  // Last name
  @Field()
  lastName!: string;

  // Email
  @Field()
  email!: string;

  // Confirm Email
  @Field()
  confirmEmail!: string;
}
