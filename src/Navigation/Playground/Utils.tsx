import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';

export const updateTrainingNotification = (
  title: string,
  description: string,
) => {
  notifee.displayNotification({
    id: 'training',
    title: title,
    body: description,
    android: {
      channelId: 'training',
      asForegroundService: true,
      category: AndroidCategory.PROGRESS,
      importance: AndroidImportance.HIGH,
      onlyAlertOnce: true,
      ongoing: true,
    },
  });
};
