import React, { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: string;
  message: ReactNode;
  type: "Success" | "Danger";
}

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("dont have Context");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const notif = { ...notification, id: Date.now().toString() };
    setNotifications((prev) => [...prev, notif]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== notif.id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
