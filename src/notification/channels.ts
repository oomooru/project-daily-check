import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const setupNotificationChannels = async () => {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync('default', {
    name: 'Default',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    bypassDnd: true,
    showBadge: true,
  });

  await Notifications.setNotificationChannelAsync('urgent', {
    name: 'Urgent Alerts',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 1000, 500, 1000],
    sound: 'alert_sound.wav',
  });
};