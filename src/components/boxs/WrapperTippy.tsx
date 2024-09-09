"use client";
import Tippy, { TippyProps } from "@tippyjs/react";
import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export interface IWraperTippyProps {
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  classNameWraper?: string;
  renderEl: ReactNode;
}
export default function WrapperTippy({
  children,
  renderEl,
  classNameWraper,
  ...props
}: IWraperTippyProps & TippyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    setWidth(ref.current.clientWidth);
  }, [ref]);
  return (
    <div>
      <Tippy
        placement="bottom"
        {...props}
        render={(attr) => {
          return (
            <div style={{ width }} tabIndex={-1} {...attr}>
              {renderEl}
            </div>
          );
        }}
      >
        <div className={classNameWraper} ref={ref}>
          {children}
        </div>
      </Tippy>
    </div>
  );
}
