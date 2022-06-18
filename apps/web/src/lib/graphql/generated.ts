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

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type LoginUserInput = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  changeUserPassword: AuthFormResponse;
  confirmUserEmail: AuthFormResponse;
  loginUser: AuthFormResponse;
  logoutUser: Scalars["Boolean"];
  registerUser: AuthFormResponse;
  resetUserPassword: AuthFormResponse;
  sendNewConfirmationCode: Scalars["Boolean"];
  sendPasswordResetEmail: Scalars["Boolean"];
};

export type MutationChangeUserPasswordArgs = {
  changeUserPasswordInput: ChangeUserPasswordInput;
};

export type MutationConfirmUserEmailArgs = {
  code: Scalars["String"];
};

export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};

export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};

export type MutationResetUserPasswordArgs = {
  resetPasswordInput: ResetUserPasswordInput;
};

export type MutationSendNewConfirmationCodeArgs = {
  sendNewConfirmationCodeInput: SendNewConfirmationCodeInput;
};

export type MutationSendPasswordResetEmailArgs = {
  email: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getCurrentUser?: Maybe<User>;
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

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["String"];
  isConfirmed: Scalars["Boolean"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
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

export type RegularFieldErrorFragment = {
  __typename?: "FieldError";
  field: string;
  message: string;
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
