import { ReactNode } from "react";
import CreateAndUpdateTask from "../Tasks/CreateAndUpdateTask";

interface ChildrenWrapperProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ChildrenWrapperProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CreateAndUpdateTask />
      {children}
    </div>
  );
};

export default ApplicationLayout;
