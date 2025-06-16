import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import TodoManager from '../manager/TodoManager';
import { NotificationTime } from '../interface/TodoInterface';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowList: true,
    shouldShowBanner: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  }),
});

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('알림 권한이 필요합니다!');
      return;
    }
  } else {
    alert('알림은 실제 디바이스에서만 작동합니다.');
  }
}

export async function scheduleNotification(notificationTime: NotificationTime) {

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '일정 확인 알림',
      body: '아직 완료하지 않은 일정이 있는지 확인해보세요.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: notificationTime.hour,
      minute: notificationTime.minute
    },
  });
}
