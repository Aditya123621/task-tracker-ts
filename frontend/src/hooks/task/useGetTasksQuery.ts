import makeApiRequest from "@/services/makeApiRequest";
import { apiEndPoints } from "@/services/apiEndPoints";
import { useQuery } from "@tanstack/react-query";

export const useGetTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await makeApiRequest.get(apiEndPoints.GET_TASK);
      return res.data;
    },
  });
};
