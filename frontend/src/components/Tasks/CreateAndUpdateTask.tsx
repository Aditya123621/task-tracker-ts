import { closeDrawer } from "@/store/slices/drawerSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Button, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ArrowHeadIcon from "@assets/icons/arrowHeadIcon.svg";
import { useCreateTaskMutation } from "@/hooks/task/useCreateTaskMutation";
import { FormTypes } from "@/types/task.types";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "@/hooks/task/useUpdateTaskMutation";

const CreateAndUpdateTask = () => {
  const defaultValues = {
    task_title: "",
    task_desc: "",
    task_status: "NOT_STARTED",
    task_priority: "",
  };
  const dispatch = useDispatch<AppDispatch>();
  const {
    reset,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });
  console.log(errors, "errors");
  const drawerInfo = useSelector(
    (state: RootState) => state.drawer.isDrawerOpen
  );

  useEffect(() => {
    if (drawerInfo?.helperData) {
      const { task_title, task_desc, task_status, task_priority } =
        drawerInfo?.helperData;
      reset({ task_title, task_desc, task_status, task_priority });
    }
  }, [drawerInfo, reset]);

  console.log(drawerInfo, "drawerInfo");

  const handleClose = () => {
    dispatch(closeDrawer());
    reset();
  };
  const { mutate: createTaskAPI, isPending: createTaskAPILoading } =
    useCreateTaskMutation(handleClose);
  const { mutate: updateTaskAPI, isPending: updateTaskAPILoading } =
    useUpdateTaskMutation(handleClose);
  const createTask = (data: FormTypes) => {
    if (drawerInfo?.helperData) {
      updateTaskAPI({ id: drawerInfo?.helperData?._id, data });
    } else {
      createTaskAPI(data);
    }
  };

  const checkForEmptyValue = (
    value: "task_title" | "task_desc" | "task_status" | "task_priority"
  ) => {
    return watch(value)?.trim() === "";
  };
  return (
    <Modal
      size={"lg"}
      centered
      opened={drawerInfo?.status}
      onClose={handleClose}
      closeOnClickOutside
      title={`${drawerInfo?.helperData ? "Update" : "Create"} Task`}
      classNames={{ title: "!text-lg !font-bold !text-[#513BE8] " }}
    >
      <form
        onSubmit={handleSubmit(createTask)}
        className="grid grid-cols-1 gap-3"
      >
        <Controller
          name="task_title"
          control={control}
          rules={{
            required:
              checkForEmptyValue("task_desc") && "This field is required",
            validate: (value) => {
              if (!checkForEmptyValue("task_desc")) {
                return true;
              }
              const trimmedValue = value?.trim();
              return (
                trimmedValue !== "" || "Title cannot be empty or just spaces"
              );
            },
            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters",
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              size="md"
              radius={"md"}
              label="Title"
              placeholder="Enter your task title"
              error={errors?.task_title?.message ?? ""}
              classNames={{
                label: " mb-1 !text-base",
              }}
            />
          )}
        />
        <Controller
          name="task_desc"
          control={control}
          rules={{
            required:
              checkForEmptyValue("task_title") && "This field is required",
            validate: (value) => {
              if (!checkForEmptyValue("task_title")) {
                return true;
              }
              const trimmedValue = value?.trim();
              return (
                trimmedValue !== "" ||
                "Description cannot be empty or just spaces"
              );
            },
            maxLength: {
              value: 1000,
              message: "Description name cannot exceed 1000 characters",
            },
          }}
          render={({ field }) => (
            <Textarea
              {...field}
              autosize
              minRows={4}
              maxRows={6}
              size="md"
              radius={"md"}
              label="Description"
              placeholder="Enter your task description"
              error={errors?.task_desc?.message ?? ""}
              classNames={{
                label: " mb-1 !text-base",
              }}
            />
          )}
        />
        <Controller
          name="task_status"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              size="md"
              radius={"md"}
              label="Choose task status"
              value={watch("task_status")}
              rightSectionPointerEvents="none"
              rightSection={<ArrowHeadIcon />}
              allowDeselect={false}
              data={[
                { label: "Paused", value: "PAUSED" },
                { label: "Not started", value: "NOT_STARTED" },
                { label: "Working", value: "WORKING" },
                { label: "Needs Feedback", value: "NEEDS_FEEDBACK" },
                { label: "Done", value: "DONE" },
              ]}
              classNames={{
                label: " mb-1 !text-base",
              }}
            />
          )}
        />
        <Controller
          name="task_priority"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field }) => (
            <Select
              {...field}
              size="md"
              radius={"md"}
              label="Pick task priority"
              placeholder="Select"
              rightSectionPointerEvents="none"
              rightSection={<ArrowHeadIcon />}
              data={["Low", "Medium", "High"]}
              classNames={{
                label: " mb-1 !text-base",
              }}
              error={errors?.task_priority?.message || ""}
            />
          )}
        />
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            size="md"
            loading={createTaskAPILoading || updateTaskAPILoading}
            radius={"md"}
            classNames={{ inner: "px-4", root: "mt-2", label: "text-white" }}
          >
            {drawerInfo?.helperData ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAndUpdateTask;
