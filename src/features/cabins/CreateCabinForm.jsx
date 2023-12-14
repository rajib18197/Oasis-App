import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

export default function CreateCabinForm({ onCloseModal, cabinToUpdate = {} }) {
  const isUpdateSession = Boolean(cabinToUpdate?.id);

  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: {
      ...cabinToUpdate,
    },
  });
  const { errors } = formState;

  const { createCabin, isCreating, isError, error } = useCreateCabin();

  const {
    updateCabin,
    isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    console.log(data);
    console.log(data.image);
    console.log(data.image[0]);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isUpdateSession) {
      updateCabin(
        { id: cabinToUpdate.id, newCabin: { ...data, image } },
        {
          onSettled: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { newCabin: { ...data, image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Cabin name"} error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Capacity"} error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should to at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "value must be less than price",
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors.description?.message}>
        <Input
          type="text"
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Image"} error={errors.file?.message}>
        <FileInput
          type="file"
          accept="image/*"
          id="image"
          {...register("image", {
            required: isUpdateSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button variation="primary" type="submit">
          {isUpdateSession
            ? isUpdating
              ? "updating"
              : "Update Cabin"
            : isCreating
            ? "Creating"
            : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}
