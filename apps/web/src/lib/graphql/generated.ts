import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthFormResponse = {
  __typename?: "AuthFormResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ChangeUserPasswordInput = {
  confirmPassword: Scalars["String"];
  oldPassword: Scalars["String"];
  password: Scalars["String"];
};

export type CreateListingInput = {
  amenities: Array<Scalars["String"]>;
  category: Scalars["String"];
  description: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  numberOfBeds: Scalars["Int"];
  numberOfGuests: Scalars["Int"];
  photo: Scalars["Upload"];
  pricePerNight: Scalars["Int"];
  title: Scalars["String"];
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Listing = {
  __typename?: "Listing";
  amenities: Array<Scalars["String"]>;
  category: Scalars["String"];
  createdAt: Scalars["String"];
  description: Scalars["String"];
  host: User;
  hostId: Scalars["String"];
  id: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  numberOfBeds: Scalars["Int"];
  numberOfGuests: Scalars["Int"];
  pictureUrl?: Maybe<Scalars["String"]>;
  pricePerNight: Scalars["Int"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type ListingFormResponse = {
  __typename?: "ListingFormResponse";
  errors?: Maybe<Array<FieldError>>;
  listing?: Maybe<Listing>;
};

export type LoginUserInput = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  changeUserPassword: AuthFormResponse;
  confirmUserEmail: AuthFormResponse;
  createListing: ListingFormResponse;
  deleteListing: Scalars["Boolean"];
  loginUser: AuthFormResponse;
  logoutUser: Scalars["Boolean"];
  registerUser: AuthFormResponse;
  resetUserPassword: AuthFormResponse;
  sendNewConfirmationCode: Scalars["Boolean"];
  sendPasswordResetEmail: Scalars["Boolean"];
  updateListing: ListingFormResponse;
};

export type MutationChangeUserPasswordArgs = {
  changeUserPasswordInput: ChangeUserPasswordInput;
};

export type MutationConfirmUserEmailArgs = {
  code: Scalars["String"];
};

export type MutationCreateListingArgs = {
  createListingInput: CreateListingInput;
};

export type MutationDeleteListingArgs = {
  id: Scalars["String"];
};

export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};

export type MutationResetUserPasswordArgs = {
  resetUserPasswordInput: ResetUserPasswordInput;
};

export type MutationSendNewConfirmationCodeArgs = {
  sendNewConfirmationCodeInput: SendNewConfirmationCodeInput;
};

export type MutationSendPasswordResetEmailArgs = {
  email: Scalars["String"];
};

export type MutationUpdateListingArgs = {
  updateListingInput: UpdateListingInput;
};

export type PaginatedListingResponse = {
  __typename?: "PaginatedListingResponse";
  hasMore: Scalars["Boolean"];
  listings: Array<Listing>;
};

export type Query = {
  __typename?: "Query";
  getCurrentUser?: Maybe<User>;
  getListing?: Maybe<Listing>;
  getListings: PaginatedListingResponse;
};

export type QueryGetListingArgs = {
  id: Scalars["String"];
};

export type QueryGetListingsArgs = {
  cursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
};

export type RegisterUserInput = {
  confirmEmail: Scalars["String"];
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type ResetUserPasswordInput = {
  confirmPassword: Scalars["String"];
  password: Scalars["String"];
  token: Scalars["String"];
};

export type SendNewConfirmationCodeInput = {
  userEmail: Scalars["String"];
  userId: Scalars["String"];
};

export type UpdateListingInput = {
  amenities?: InputMaybe<Array<Scalars["String"]>>;
  category?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["String"];
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  newPhoto?: InputMaybe<Scalars["Upload"]>;
  numberOfBeds?: InputMaybe<Scalars["Int"]>;
  numberOfGuests?: InputMaybe<Scalars["Int"]>;
  pricePerNight?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["String"];
  isConfirmed: Scalars["Boolean"];
  listings?: Maybe<Array<Listing>>;
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type RegularFieldErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
};

export type RegularListingFormResponseFragment = {
  __typename?: "ListingFormResponse";
  listing?: {
    __typename?: "Listing";
    id: string;
    title: string;
    description: string;
    pricePerNight: number;
    numberOfGuests: number;
    numberOfBeds: number;
    category: string;
    pictureUrl?: string | null;
    latitude: number;
    longitude: number;
    amenities: Array<string>;
    hostId: string;
    createdAt: string;
    updatedAt: string;
    host: { __typename?: "User"; username: string };
  } | null;
  errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
};

export type RegularListingFragment = {
  __typename?: "Listing";
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  numberOfGuests: number;
  numberOfBeds: number;
  category: string;
  pictureUrl?: string | null;
  latitude: number;
  longitude: number;
  amenities: Array<string>;
  hostId: string;
  createdAt: string;
  updatedAt: string;
  host: { __typename?: "User"; username: string };
};

export type RegularAuthFormResponseFragment = {
  __typename?: "AuthFormResponse";
  user?: {
    __typename?: "User";
    id: string;
    username: string;
    email: string;
    isConfirmed: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
};

export type RegularUserFragment = {
  __typename?: "User";
  id: string;
  username: string;
  email: string;
  isConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateListingMutationVariables = Exact<{
  createListingInput: CreateListingInput;
}>;

export type CreateListingMutation = {
  __typename?: "Mutation";
  createListing: {
    __typename?: "ListingFormResponse";
    listing?: {
      __typename?: "Listing";
      id: string;
      title: string;
      description: string;
      pricePerNight: number;
      numberOfGuests: number;
      numberOfBeds: number;
      category: string;
      pictureUrl?: string | null;
      latitude: number;
      longitude: number;
      amenities: Array<string>;
      hostId: string;
      createdAt: string;
      updatedAt: string;
      host: { __typename?: "User"; username: string };
    } | null;
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
  };
};

export type DeleteListingMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteListingMutation = { __typename?: "Mutation"; deleteListing: boolean };

export type UpdateListingMutationVariables = Exact<{
  updateListingInput: UpdateListingInput;
}>;

export type UpdateListingMutation = {
  __typename?: "Mutation";
  updateListing: {
    __typename?: "ListingFormResponse";
    listing?: {
      __typename?: "Listing";
      id: string;
      title: string;
      description: string;
      pricePerNight: number;
      numberOfGuests: number;
      numberOfBeds: number;
      category: string;
      pictureUrl?: string | null;
      latitude: number;
      longitude: number;
      amenities: Array<string>;
      hostId: string;
      createdAt: string;
      updatedAt: string;
      host: { __typename?: "User"; username: string };
    } | null;
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
  };
};

export type ChangeUserPasswordMutationVariables = Exact<{
  changeUserPasswordInput: ChangeUserPasswordInput;
}>;

export type ChangeUserPasswordMutation = {
  __typename?: "Mutation";
  changeUserPassword: {
    __typename?: "AuthFormResponse";
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      isConfirmed: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
  };
};

export type ConfirmUserEmailMutationVariables = Exact<{
  code: Scalars["String"];
}>;

export type ConfirmUserEmailMutation = {
  __typename?: "Mutation";
  confirmUserEmail: {
    __typename?: "AuthFormResponse";
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      isConfirmed: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
  };
};

export type LoginUserMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;

export type LoginUserMutation = {
  __typename?: "Mutation";
  loginUser: {
    __typename?: "AuthFormResponse";
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      isConfirmed: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
  };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = { __typename?: "Mutation"; logoutUser: boolean };

export type RegisterUserMutationVariables = Exact<{
  registerUserInput: RegisterUserInput;
}>;

export type RegisterUserMutation = {
  __typename?: "Mutation";
  registerUser: {
    __typename?: "AuthFormResponse";
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      isConfirmed: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
  };
};

export type ResetUserPasswordMutationVariables = Exact<{
  resetUserPasswordInput: ResetUserPasswordInput;
}>;

export type ResetUserPasswordMutation = {
  __typename?: "Mutation";
  resetUserPassword: {
    __typename?: "AuthFormResponse";
    user?: {
      __typename?: "User";
      id: string;
      username: string;
      email: string;
      isConfirmed: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    errors?: Array<{ __typename?: "FieldError"; field: string; message: string }> | null;
  };
};

export type SendNewConfirmationCodeMutationVariables = Exact<{
  sendNewConfirmationCodeInput: SendNewConfirmationCodeInput;
}>;

export type SendNewConfirmationCodeMutation = {
  __typename?: "Mutation";
  sendNewConfirmationCode: boolean;
};

export type SendPasswordResetEmailMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type SendPasswordResetEmailMutation = {
  __typename?: "Mutation";
  sendPasswordResetEmail: boolean;
};

export type GetListingQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetListingQuery = {
  __typename?: "Query";
  getListing?: {
    __typename?: "Listing";
    id: string;
    title: string;
    description: string;
    pricePerNight: number;
    numberOfGuests: number;
    numberOfBeds: number;
    category: string;
    pictureUrl?: string | null;
    latitude: number;
    longitude: number;
    amenities: Array<string>;
    hostId: string;
    createdAt: string;
    updatedAt: string;
    host: { __typename?: "User"; username: string };
  } | null;
};

export type GetListingsQueryVariables = Exact<{
  limit: Scalars["Int"];
  cursor?: InputMaybe<Scalars["String"]>;
}>;

export type GetListingsQuery = {
  __typename?: "Query";
  getListings: {
    __typename?: "PaginatedListingResponse";
    hasMore: boolean;
    listings: Array<{
      __typename?: "Listing";
      id: string;
      title: string;
      description: string;
      pricePerNight: number;
      numberOfGuests: number;
      numberOfBeds: number;
      category: string;
      pictureUrl?: string | null;
      latitude: number;
      longitude: number;
      amenities: Array<string>;
      hostId: string;
      createdAt: string;
      updatedAt: string;
      host: { __typename?: "User"; username: string };
    }>;
  };
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: "Query";
  getCurrentUser?: {
    __typename?: "User";
    id: string;
    username: string;
    email: string;
    isConfirmed: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export const RegularListingFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RegularListing" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Listing" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "pricePerNight" } },
          { kind: "Field", name: { kind: "Name", value: "numberOfGuests" } },
          { kind: "Field", name: { kind: "Name", value: "numberOfBeds" } },
          { kind: "Field", name: { kind: "Name", value: "category" } },
          { kind: "Field", name: { kind: "Name", value: "pictureUrl" } },
          { kind: "Field", name: { kind: "Name", value: "latitude" } },
          { kind: "Field", name: { kind: "Name", value: "longitude" } },
          { kind: "Field", name: { kind: "Name", value: "amenities" } },
          { kind: "Field", name: { kind: "Name", value: "hostId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "host" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "username" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegularListingFragment, unknown>;
export const RegularFieldErrorFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RegularFieldError" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "FieldError" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "field" } },
          { kind: "Field", name: { kind: "Name", value: "message" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegularFieldErrorFragment, unknown>;
export const RegularListingFormResponseFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RegularListingFormResponse" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ListingFormResponse" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listing" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RegularListing" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "errors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RegularFieldError" } },
              ],
            },
          },
        ],
      },
    },
    ...RegularListingFragmentDoc.definitions,
    ...RegularFieldErrorFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<RegularListingFormResponseFragment, unknown>;
export const RegularUserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RegularUser" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "isConfirmed" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegularUserFragment, unknown>;
export const RegularAuthFormResponseFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RegularAuthFormResponse" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AuthFormResponse" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RegularUser" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "errors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RegularFieldError" } },
              ],
            },
          },
        ],
      },
    },
    ...RegularUserFragmentDoc.definitions,
    ...RegularFieldErrorFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<RegularAuthFormResponseFragment, unknown>;
export const CreateListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateListing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "createListingInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateListingInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createListing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createListingInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "createListingInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RegularListingFormResponse" },
                },
              ],
            },
          },
        ],
      },
    },
    ...RegularListingFormResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<CreateListingMutation, CreateListingMutationVariables>;
export const DeleteListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteListing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteListing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteListingMutation, DeleteListingMutationVariables>;
export const UpdateListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateListing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "updateListingInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateListingInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateListing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "updateListingInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "updateListingInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RegularListingFormResponse" },
                },
              ],
            },
          },
        ],
      },
    },
    ...RegularListingFormResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<UpdateListingMutation, UpdateListingMutationVariables>;
export const ChangeUserPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ChangeUserPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "changeUserPasswordInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ChangeUserPasswordInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "changeUserPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "changeUserPasswordInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "changeUserPasswordInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RegularAuthFormResponse" },
                },
              ],
            },
          },
        ],
      },
    },
    ...RegularAuthFormResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>;
export const ConfirmUserEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ConfirmUserEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "code" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "confirmUserEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "code" },
                value: { kind: "Variable", name: { kind: "Name", value: "code" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RegularAuthFormResponse" },
                },
              ],
            },
          },
        ],
      },
    },
    ...RegularAuthFormResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ConfirmUserEmailMutation, ConfirmUserEmailMutationVariables>;
export const LoginUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LoginUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "loginUserInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "LoginUserInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loginUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "loginUserInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "loginUserInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RegularAuthFormResponse" },
                },
              ],
            },
          },
        ],
      },
    },
    ...RegularAuthFormResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LogoutUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "logoutUser" } }],
      },
    },
  ],
} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RegisterUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "registerUserInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "RegisterUserInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "registerUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "registerUserInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "registerUserInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RegularAuthFormResponse" },
                },
              ],
            },
          },
        ],
      },
    },
    ...RegularAuthFormResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const ResetUserPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetUserPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "resetUserPasswordInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ResetUserPasswordInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetUserPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "resetUserPasswordInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "resetUserPasswordInput" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RegularAuthFormResponse" },
                },
              ],
            },
          },
        ],
      },
    },
    ...RegularAuthFormResponseFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>;
export const SendNewConfirmationCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendNewConfirmationCode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sendNewConfirmationCodeInput" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SendNewConfirmationCodeInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendNewConfirmationCode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sendNewConfirmationCodeInput" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sendNewConfirmationCodeInput" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendNewConfirmationCodeMutation,
  SendNewConfirmationCodeMutationVariables
>;
export const SendPasswordResetEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendPasswordResetEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendPasswordResetEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: { kind: "Variable", name: { kind: "Name", value: "email" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendPasswordResetEmailMutation,
  SendPasswordResetEmailMutationVariables
>;
export const GetListingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetListing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getListing" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RegularListing" } },
              ],
            },
          },
        ],
      },
    },
    ...RegularListingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetListingQuery, GetListingQueryVariables>;
export const GetListingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetListings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getListings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: { kind: "Variable", name: { kind: "Name", value: "limit" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: { kind: "Variable", name: { kind: "Name", value: "cursor" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "listings" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "RegularListing" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "hasMore" } },
              ],
            },
          },
        ],
      },
    },
    ...RegularListingFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetListingsQuery, GetListingsQueryVariables>;
export const GetCurrentUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetCurrentUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getCurrentUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "RegularUser" } },
              ],
            },
          },
        ],
      },
    },
    ...RegularUserFragmentDoc.definitions,
  ],
} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
