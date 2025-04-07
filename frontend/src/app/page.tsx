"use client";

import { TruncateAndProvideTooltip } from "@/utils/truncateAndProvideTooltip";
import { Button, Loader, Tooltip } from "@mantine/core";
import Scrollbars from "react-custom-scrollbars-2";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/store/slices/drawerSlice";
import LowPriority from "@assets/icons/low_priority.svg";
import MediumPriority from "@assets/icons/medium_priority.svg";
import HighPriority from "@assets/icons/high_priority.svg";
// import DeleteIcon from "@assets/icons/delete.svg";
import dayjs from "dayjs";
import { ReactElement, useEffect, useState } from "react";
import { useGetTasksQuery } from "@/hooks/task/useGetTasksQuery";
import { FormTypes } from "@/types/task.types";
import { taskData } from "@/data/taskData";
import Image from "next/image";

interface TaskGroup {
  id: number;
  title: string;
  backgroundColor: string;
  data: FormTypes[];
}

// interface SvgType {}

type TaskStatusTitle =
  | "PAUSED"
  | "NOT STARTED"
  | "WORKING"
  | "NEEDS FEEDBACK"
  | "DONE";

type PriorityLevel = "Low" | "Medium" | "High";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [organizedTaskData, setOrganizedTaskData] =
    useState<TaskGroup[]>(taskData);
  const { data: getAllTasks, isPending: taskDataFromAPILoading } =
    useGetTasksQuery();
  const [taskDataLoading, setTaskDataLoading] = useState(true);
  const PriorityIcons: Record<PriorityLevel, ReactElement> = {
    Low: <LowPriority width="16" height="16" className="text-[#34cc23]" />,
    Medium: (
      <MediumPriority width="16" height="16" className="text-[#d7de0d]" />
    ),
    High: <HighPriority width="16" height="16" className="text-[#F44336]" />,
  };
  useEffect(() => {
    if (!taskDataFromAPILoading) {
      if (getAllTasks?.data) {
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
            (task: FormTypes) => task.task_status === matchingStatus
          );
          return {
            ...taskGroup,
            data: filteredTasks,
          };
        });
        setOrganizedTaskData(updatedTaskData);
      }
      setTaskDataLoading(false);
    }
  }, [getAllTasks, taskDataFromAPILoading]);

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
              className={`text-center p-6 text-white font-bold text-2xl border-b`}
              style={{
                backgroundColor: each?.backgroundColor ?? "red",
              }}
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
                      <p
                        className="line-clamp-3 text-start break-all"
                        title={taskData?.task_desc}
                      >
                        {taskData?.task_desc}
                      </p>
                      <div className="flex justify-between">
                        <div className="italic text-xs">
                          Last edited:{" "}
                          {dayjs(taskData?.updatedAt)?.format(
                            "DD MMM YYYY [at] HH:mm"
                          )}
                        </div>
                        <Tooltip
                          label={taskData?.task_priority}
                          color="#128797"
                        >
                          <div>
                            {
                              PriorityIcons[
                                (taskData?.task_priority as PriorityLevel) ||
                                  "Low"
                              ]
                            }
                          </div>
                        </Tooltip>
                        {/* <Tooltip color="red" label="Delete">
                          <button type="button">
                            <DeleteIcon
                              className="text-red-700 w-4 h-5"
                            />
                          </button>
                        </Tooltip> */}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="h-full flex justify-center items-center relative">
                  {taskDataLoading ? (
                    <Loader />
                  ) : (
                    <div className="flex flex-col gap-6 justify-center items-center">
                      <Image
                        src={`/icons/empty_fall_back_${each?.id}.svg`}
                        width={10}
                        height={10}
                        className="w-full h-full"
                        alt="fallback image"
                      />
                      <p className="text-3xl text-pink-800 font-bold absolute bottom-20 left-1/2 transform -translate-x-1/2">
                        No Data
                      </p>
                    </div>
                  )}
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
