import { apiEndPoints } from "@/services/apiEndPoints";
import { ErrorToast, SuccessToast } from "@/utils/customToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "@/services/makeApiRequest";
import { FormTypes } from "@/types/task.types";

export const useUpdateTaskMutation = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormTypes }) => {
      const response = await makeApiRequest.put(
        `${apiEndPoints.UPDATE_TASK}/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      SuccessToast({ title: response?.message });
      handleClose();
    },
    onError: (error) => {
      ErrorToast({ title: error?.message });
    },
  });
};
