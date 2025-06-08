import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

export const useNotificationListener = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { data } = response.notification.request.content;
      
      if (data?.screen) {
        navigation.navigate(data.screen, data.params);
      }
    });

    return () => responseSubscription.remove();
  }, [navigation]);
};