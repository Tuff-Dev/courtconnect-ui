import React, { useRef, useEffect, useContext } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";

const TransitionContext = React.createContext({
  parent: {},
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

interface Props {
  show: boolean;
  enter?: string;
  enterStart?: string;
  enterEnd?: string;
  leave?: string;
  leaveStart?: string;
  leaveEnd?: string;
  appear?: string;
  unmountOnExit?: boolean;
  tag?: string;
  children: React.ReactElement[];
}

function CSSTransition({
  show,
  enter = "",
  enterStart = "",
  enterEnd = "",
  leave = "",
  leaveStart = "",
  leaveEnd = "",
  appear,
  unmountOnExit = true,
  tag = "div",
  children,
  ...rest
}: Props) {
  const enterClasses = enter.split(" ").filter((s) => s.length);
  const enterStartClasses = enterStart.split(" ").filter((s) => s.length);
  const enterEndClasses = enterEnd.split(" ").filter((s) => s.length);
  const leaveClasses = leave.split(" ").filter((s) => s.length);
  const leaveStartClasses = leaveStart.split(" ").filter((s) => s.length);
  const leaveEndClasses = leaveEnd.split(" ").filter((s) => s.length);
  const removeFromDom = unmountOnExit;

  function addClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.add(...classes);
  }

  function removeClasses(node: HTMLElement, classes: string[]) {
    classes.length && node.classList.remove(...classes);
  }

  const nodeRef = React.useRef<HTMLDivElement>(null);
  const Component = tag;

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done: any) => {
        !!nodeRef.current &&
          nodeRef.current.addEventListener("transitionend", done, false);
      }}
      onEnter={() => {
        if (!removeFromDom && !!nodeRef.current) {
          nodeRef.current.style.display == null;
          addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
        }
      }}
      onEntering={() => {
        if (!!nodeRef.current) {
          removeClasses(nodeRef.current, enterStartClasses);
          addClasses(nodeRef.current, enterEndClasses);
        }
      }}
      onEntered={() => {
        if (!!nodeRef.current) {
          removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
        }
      }}
      onExit={() => {
        if (!!nodeRef.current) {
          addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
        }
      }}
      onExiting={() => {
        if (!!nodeRef.current) {
          removeClasses(nodeRef.current, leaveStartClasses);
          addClasses(nodeRef.current, leaveEndClasses);
        }
      }}
      onExited={() => {
        if (!!nodeRef.current) {
          removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
          if (!removeFromDom) nodeRef.current.style.display = "none";
        }
      }}
    >
      <div
        ref={nodeRef}
        {...rest}
        style={{ display: !removeFromDom ? "none" : "" }}
      >
        {children}
      </div>
    </ReactCSSTransition>
  );
}

function Transition({ show, appear, ...rest }: Props) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
