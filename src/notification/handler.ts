import * as Notifications from 'expo-notifications';

export const setupNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowList: true,
      shouldShowBanner: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

export const registerForPushNotifications = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    console.warn('알림 권한이 거부되었습니다.');
    return false;
  }
  
  return true;
};