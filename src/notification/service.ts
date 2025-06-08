import * as Notifications from 'expo-notifications';

type NotificationContent = {
  title: string;
  body?: string;
  data?: Record<string, any>;
  sound?: boolean | string;
  badge?: number;
};

export class LocalNotificationService {
  static async schedule(
    content: NotificationContent,
    trigger: Notifications.NotificationTriggerInput
  ) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: content.title,
        body: content.body,
        data: content.data,
        sound: content.sound,
        badge: content.badge,
      },
      trigger,
    });
  }

  static async present(content: Omit<NotificationContent, 'badge'>) {
    await Notifications.presentNotificationAsync({
      title: content.title,
      body: content.body,
      data: content.data,
      sound: content.sound,
    });
  }

  static async cancelAll() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.dismissAllNotificationsAsync();
  }

  static async getPending() {
    return await Notifications.getAllScheduledNotificationsAsync();
  }
}