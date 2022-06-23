import { createListingSchema } from "@abb/yup-schemas";
import { useMutation } from "@apollo/client";
import { Box, Button, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { CreateListingMutation, CreateListingMutationVariables } from "../../lib/graphql/generated";
import { CREATE_LISTING_MUTATION } from "../../lib/graphql/mutations";
import { toErrorMap } from "../../lib/utils";
import { ChipInput } from "../ChipInput/ChipInput";
import { FormInput } from "../FormInput";
import { ImageInput } from "../ImageInput";
import { NumberInput } from "../NumberInput";

export const CreateListingForm: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const TOAST_ID_GRAPHQL_ERROR = "create-listing-form-graphql-error";
  const [createListing] = useMutation<CreateListingMutation, CreateListingMutationVariables>(
    CREATE_LISTING_MUTATION
  );

  return (
    <Formik
      initialValues={{
        photo: "",
        name: "",
        category: "",
        description: "",
        pricePerDay: 49,
        numberOfBeds: 1,
        maxNumberOfGuests: 1,
        amenities: [],
        latitude: 1.234_567,
        longitude: -1.234_567,
      }}
      validationSchema={createListingSchema}
      onSubmit={async (values, { setErrors, setFieldError }) => {
        if (!values.photo) {
          setFieldError("photo", "Photo is required");
        }

        const response = await createListing({
          variables: { createListingInput: values },
        });

        const graphqlError = response.errors;
        const errors = response.data?.createListing.errors;
        const listing = response.data?.createListing.listing;

        if (graphqlError && graphqlError.length > 0 && !toast.isActive(TOAST_ID_GRAPHQL_ERROR)) {
          toast({
            id: TOAST_ID_GRAPHQL_ERROR,
            title: "Error",
            description: graphqlError[0].message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          });
        }

        if (errors && errors.length > 0) {
          setErrors(toErrorMap(errors));
        } else if (listing) {
          router
            .push(`/listings/${listing.id}`)
            // eslint-disable-next-line no-console
            .catch((error) => console.error("[Router Error]:", error));
        }
      }}
    >
      {({
        isSubmitting,
        setFieldValue,
        errors: { photo: photoError },
        touched: { photo: photoTouched },
      }) => (
        <Form>
          <ImageInput
            name="photo"
            fieldId="photo"
            label="Photo"
            error={photoError}
            touched={photoTouched}
            setFieldValue={setFieldValue}
          />
          <Box mt={4}>
            <FormInput name="name" label="Title" placeholder="Title" />
          </Box>
          <Box mt={4}>
            <FormInput name="category" label="Category" placeholder="Category" />
          </Box>
          <Box mt={4}>
            <FormInput name="description" label="Description" placeholder="Description" textarea />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="pricePerDay"
              label="Price Per Day"
              placeholder="Price Per Day"
              min={0}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="numberOfBeds"
              label="Number of Beds"
              placeholder="Number of Beds"
              min={1}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="maxNumberOfGuests"
              label="Max Number of Guests"
              placeholder="Max Number of Guests"
              min={1}
              step={1}
              setFieldValue={setFieldValue}
            />
          </Box>
          {/* TODO: ARRAY CHIP INPUT!!! */}

          <Box mt={4}>
            <ChipInput
              name="amenities"
              inputLabel="Amenities"
              placeholder="Enter Amenities"
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="latitude"
              label="Latitude"
              placeholder="Latitude"
              step={0.000_001}
              pattern="-?[0-9]\d*(\.\d{0,6})?$"
              setFieldValue={setFieldValue}
            />
          </Box>
          <Box mt={4}>
            <NumberInput
              name="longitude"
              label="Longitude"
              placeholder="Longitude"
              step={0.000_001}
              pattern="-?[0-9]\d*(\.\d{0,6})?$"
              setFieldValue={setFieldValue}
            />
          </Box>
          <Button
            type="submit"
            isLoading={isSubmitting}
            marginTop={4}
            colorScheme="blue"
            width="100%"
          >
            Create Listing
          </Button>
        </Form>
      )}
    </Formik>
  );
};
