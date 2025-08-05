import { createContext, useContext, useEffect, useRef, useState } from "react";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const intervalRef = useRef(null);

  const addNotification = (message) => {
    setNotifications((prev) => [
      { id: idCounter, message, read: false },
      ...prev,
    ]);
    setIdCounter((prev) => prev + 1);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const stopNotifications = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      addNotification("📬 You have a new message!");
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllAsRead,
        stopNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
