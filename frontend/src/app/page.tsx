"use client";

import { TruncateAndProvideTooltip } from "@/utils/truncateAndProvideTooltip";
import { Button, Select } from "@mantine/core";
import Scrollbars from "react-custom-scrollbars-2";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/store/slices/drawerSlice";
import ArrowHeadIcon from "@assets/icons/arrowHeadIcon.svg";
import { useEffect, useState } from "react";
import { useGetTasksQuery } from "@/hooks/task/useGetTasksQuery";
import { FormTypes } from "@/types/task.types";
import { taskData } from "@/data/taskData";

interface TaskWithID extends FormTypes {
  _id: number;
}
interface TaskGroup {
  id: number;
  title: string;
  backgroundColor: string;
  data: TaskWithID[];
}

type TaskStatusTitle =
  | "PAUSED"
  | "NOT STARTED"
  | "WORKING"
  | "NEEDS FEEDBACK"
  | "DONE";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [organizedTaskData, setOrganizedTaskData] = useState<TaskGroup[]>([]);
  const { data: getAllTasks, isPending: taskDataLoading } = useGetTasksQuery();

  useEffect(() => {
    console.log(getAllTasks?.data, "get ALl tasks");
    if (getAllTasks?.data && !taskDataLoading) {
      const statusMap: Record<TaskStatusTitle, string> = {
        PAUSED: "PAUSED",
        "NOT STARTED": "NOT_STARTED",
        WORKING: "WORKING",
        "NEEDS FEEDBACK": "NEEDS_FEEDBACK",
        DONE: "DONE",
      };

      const updatedTaskData = taskData.map((taskGroup) => {
        const taskGroupTitle = taskGroup.title as TaskStatusTitle;
        const matchingStatus = statusMap?.[taskGroupTitle];
        const filteredTasks = getAllTasks?.data?.filter(
          (task: TaskWithID) => task.task_status === matchingStatus
        );
        return {
          ...taskGroup,
          data: filteredTasks,
        };
      });

      setOrganizedTaskData(updatedTaskData);
    }
  }, [getAllTasks, taskDataLoading]);

  console.log(organizedTaskData, "task Data");

  return (
    <div className="flex-auto flex flex-col gap-6 py-6 ">
      <div className="relative">
        <p className=" text-center lg:text-4xl text-2xl font-extrabold  bg-gradient-to-b from-[#513BE8] to-[#6141C1] bg-clip-text text-transparent">
          Task tracker
        </p>
        <div className="absolute top-0 right-6 bottom-0">
          <Button
            leftSection={<div className="text-white text-xl">+</div>}
            size="md"
            classNames={{ label: "text-lg text-white" }}
            onClick={() => {
              dispatch(openDrawer(null));
            }}
          >
            Create
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 space-x-6 px-6 flex-auto">
        {organizedTaskData?.map((each) => (
          <div
            key={each?.id}
            className={`flex flex-col rounded-lg overflow-hidden border bg-[#F2F2F2] `}
          >
            <p
              className={`text-center p-6 text-white font-bold text-2xl border-b ${each?.backgroundColor}`}
            >
              {each?.title}
            </p>
            <Scrollbars universal autoHide>
              {each?.data?.length > 0 ? (
                <div className="flex flex-col gap-4 py-3 px-3">
                  {each?.data?.map((taskData) => (
                    <button
                      key={taskData?._id}
                      onClick={() => {
                        dispatch(openDrawer(taskData));
                      }}
                      className="flex flex-col gap-3  bg-white p-3 rounded-lg  "
                    >
                      <div className="grid grid-cols-1 bg-[#F2F2F2] p-2 text-center font-semibold rounded-lg break-all ">
                        <TruncateAndProvideTooltip
                          color="#26BF94"
                          text={taskData?.task_title || "-"}
                          maxWidth={300}
                          transitionType="fade-up"
                        />
                      </div>
                      <Select
                        size="md"
                        radius={"md"}
                        rightSectionPointerEvents="none"
                        rightSection={<ArrowHeadIcon />}
                        allowDeselect={false}
                        placeholder="Pick priority"
                        value={taskData?.task_priority}
                        data={["Low", "Medium", "High"]}
                      />
                      <p
                        className="line-clamp-3 text-start"
                        title={taskData?.task_desc}
                      >
                        {taskData?.task_desc}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="h-full flex justify-center items-center">
                  <p className="text-3xl text-pink-800 font-bold">No Task</p>
                </div>
              )}
            </Scrollbars>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
