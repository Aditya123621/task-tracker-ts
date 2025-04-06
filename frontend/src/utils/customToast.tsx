import Image from "next/image";
import { toast } from "react-toastify";

type ToastType = "success" | "error";

const toastBodyColor: Record<ToastType, string> = {
  success: "#F6FFF9",
  error: "#FFF5F3",
};

const toastBorderColor: Record<ToastType, string> = {
  success: "#48C1B5",
  error: "#F4B0A1",
};

const iconMap: Record<ToastType, string> = {
  success: "/icons/toast_success.svg",
  error: "/icons/toast_error.svg",
};

interface ToastProps {
  toastType?: ToastType;
  title?: string | null;
  message?: string | null;
  titleClassName?: string;
  messageClassName?: string;
}

const CustomToast = ({
  toastType = "success",
  title,
  message,
  titleClassName = "text-xl font-semibold !font-dmSans",
  messageClassName = "text-sm !font-dmSans",
}: ToastProps) => {
  return toast.success(
    <div className="flex gap-6">
      <Image src={iconMap[toastType]} width={30} height={30} alt="toast" />
      <div className="flex-1 flex flex-col gap-1 justify-center">
        {title && (
          <strong className={titleClassName} style={{ color: "#27303A" }}>
            {title}
          </strong>
        )}
        {message && (
          <p className={messageClassName} style={{ color: "#2F3F53" }}>
            {message}
          </p>
        )}
      </div>
      <div className="items-start">
        <button onClick={() => toast.dismiss()}>
          <Image
            src={"/icons/close_light.svg"}
            width={16}
            height={16}
            alt="close"
          />
        </button>
      </div>
    </div>,
    {
      hideProgressBar: true,
      closeButton: false,
      style: {
        backgroundColor: toastBodyColor[toastType],
        border: `1px solid ${toastBorderColor[toastType]}`,
        width: "fit-content",
        maxWidth: "500px",
        borderRadius: "12px",
      },
      draggableDirection: "x",
      draggable: true,
      icon: false,
    }
  );
};

export const SuccessToast = (props: Partial<Omit<ToastProps, "toastType">>) => {
  return CustomToast({ ...props, toastType: "success" });
};

export const ErrorToast = (props: Partial<Omit<ToastProps, "toastType">>) => {
  return CustomToast({ ...props, toastType: "error" });
};
