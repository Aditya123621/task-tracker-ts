import { apiEndPoints } from "@/services/apiEndPoints";
import { ErrorToast, SuccessToast } from "@/utils/customToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "@/services/makeApiRequest";
import { AxiosError } from "axios";

export const useDeleteTaskMutation = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await makeApiRequest.delete(
        `${apiEndPoints.DELETE_TASK}/${id}`
      );
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      SuccessToast({ title: response?.message || "Task deleted successfully" });
      handleClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      ErrorToast({
        title:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    },
  });
};
