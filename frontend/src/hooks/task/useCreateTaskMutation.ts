import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "@/services/makeApiRequest";
import { ErrorToast, SuccessToast } from "@/utils/customToast";
import { apiEndPoints } from "@/services/apiEndPoints";
import { FormTypes } from "@/types/task.types";

export const useCreateTaskMutation = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormTypes) => {
      const response = await makeApiRequest.post(
        apiEndPoints?.CREATE_TASK,
        data
      );
      return response.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      SuccessToast({ title: res?.message });
      handleClose();
    },
    onError: (error) => {
      ErrorToast({ title: error?.message });
    },
  });
};
