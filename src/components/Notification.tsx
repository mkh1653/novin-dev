import React from "react";
import ReactDOM from "react-dom";
import { useNotification } from "./NotifContext";

const Notification: React.FC = () => {
  const { notifications } = useNotification();

  return ReactDOM.createPortal(
    <>
      {notifications.map(({ id, message, type }) => (
        <div
          className={`max-w-full fixed left-5 top-5 rounded-md py-3 px-4 text-white backdrop-blur-sm ${
            type === "Danger" ? "bg-red-500/40" : "bg-green-500/70"
          }`}
          key={id}>
          <div className='p-2.5'>{message}</div>
        </div>
      ))}
    </>,
    document.body
  );
};

export default Notification;
