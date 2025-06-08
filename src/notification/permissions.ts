import * as Notifications from 'expo-notifications';

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowDisplayInCarPlay: true,
      allowCriticalAlerts: true,
    },
    android: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowVibrate: true,
      importance: Notifications.AndroidImportance.MAX,
    },
  });

  return status === 'granted';
};

export const checkPermissionStatus = async () => {
  return await Notifications.getPermissionsAsync();
};