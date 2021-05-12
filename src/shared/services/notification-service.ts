import * as Notifications from 'expo-notifications'; 

type Notification = {
  repeat_every: string;
  times: number;
  timeNotification: Date,
  content: Notifications.NotificationContentInput
}

class NotificationService {

  async setNotification({
    repeat_every, 
    times,
    timeNotification,
    content
  }: Notification) {
    const now = new Date();

    const nextTime = this.setNotificationInterval(
      repeat_every,
      times,
      timeNotification
    );

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime() / 1000)
    )

    return await Notifications.scheduleNotificationAsync({ 
      content: {
        ...content,
        priority: Notifications.AndroidNotificationPriority.HIGH
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true
      }
     });
  }

  private setNotificationInterval(
    repeat_every: string, 
    times: number,
    timeNotification: Date
  ) {
    
    const nextTime = new Date(timeNotification);
    const now = new Date();

    if(repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
      return nextTime;
    }

    nextTime.setDate(nextTime.getDate() + 1);
    return nextTime;
  }

}

export default new NotificationService();