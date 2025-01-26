import React from "react";
import ReactDOM from "react-dom";

const Template: React.FC<{ children: React.ReactNode; show: boolean }> = ({
  children,
  show,
}) => {
  return (
    show && (
      <div className='w-screen h-screen fixed top-0 left-0 bg-slate-600/45 backdrop-blur-md z-50 flex justify-center items-center'>
        <div className='modal-content w-11/12 md:w-7/12 lg:w-1/2 shadow-xl bg-white'>
          {children}
        </div>
      </div>
    )
  );
};

const Modal: React.FC<{ children: React.ReactNode; show: boolean }> = (
  props
) => {
  return ReactDOM.createPortal(<Template {...props} />, document.body);
};

export default Modal;
