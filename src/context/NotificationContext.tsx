import { createContext, useContext, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { LocalNotificationService } from '../notification/service';
import { requestNotificationPermissions } from '../notification/permissions';

type NotificationContextType = {
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
  scheduleNotification: typeof LocalNotificationService.schedule;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    checkPermission();
  }, []);

  const requestPermission = async () => {
    const granted = await requestNotificationPermissions();
    setHasPermission(granted);
    return granted;
  };

  return (
    <NotificationContext.Provider
      value={{
        hasPermission,
        requestPermission,
        scheduleNotification: LocalNotificationService.schedule,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};