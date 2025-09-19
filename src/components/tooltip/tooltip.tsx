"use client";

import { ReactNode, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";

type Position = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  text?: string;
  tooltipChildren?: ReactNode;
  position?: Position;
  className?: string;
}

export const Tooltip = ({
  children,
  text,
  tooltipChildren,
  position = "bottom",
  className = "",
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement>(null);

  const {
    x,
    y,
    refs,
    floatingStyles,
    strategy,
    middlewareData,
    placement,
    context,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: position,
    middleware: [
      offset(12),
      flip({
        fallbackPlacements: ["top", "bottom", "left", "right"],
      }),
      shift({ padding: 12 }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      <div
        ref={refs.setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={className}
      >
        {children}
      </div>
      {isOpen &&
        (text || tooltipChildren) &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: 9999,
            }}
            className="px-3 py-2 bg-gray-600 rounded-md shadow-lg w-fit max-w-96"
          >
            {text && <span className="text-xs text-white">{text}</span>}
            {tooltipChildren && <div>{tooltipChildren}</div>}
            {/* Arrow */}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className="fill-gray-600"
            />
          </div>,
          document.body
        )}
    </>
  );
};
