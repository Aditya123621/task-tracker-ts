import { FloatingPosition, MantineTransition, Tooltip } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";

interface TooltipWrapperProps {
  text: string;
  color?: string;
  position?: FloatingPosition;
  multiline?: boolean;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
  withArrow?: boolean;
  transitionType?: MantineTransition;
  tooltipClassess?: string;
}

export const TruncateAndProvideTooltip = ({
  text,
  color,
  position,
  multiline,
  className,
  maxWidth,
  maxHeight,
  withArrow,
  transitionType,
  tooltipClassess,
}: TooltipWrapperProps) => {
  const inputRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = inputRef.current as HTMLElement | null;
    if (!element) return;

    const checkTruncation = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);

    checkTruncation();

    return () => resizeObserver.disconnect();
  }, [text]);

  return (
    <Tooltip
      color={color ?? "#26BF94"}
      label={isTruncated ? text : ""}
      disabled={!isTruncated}
      position={position ?? "top-start"}
      multiline={multiline ?? true}
      withArrow={withArrow ?? false}
      events={{ hover: false, focus: false, touch: true }}
      classNames={{
        tooltip: `text-sm ${tooltipClassess ?? ""}`,
      }}
      styles={{
        tooltip: {
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflow: "auto",
        },
      }}
      maw={maxWidth}
      mah={maxHeight}
      transitionProps={{
        duration: 200,
        transition: transitionType ?? "fade",
      }}
    >
      <div ref={inputRef} className={`truncate overflow-hidden ${className}`}>
        {text}
      </div>
    </Tooltip>
  );
};
