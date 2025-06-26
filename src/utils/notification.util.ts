import { NotificationArgsProps } from 'antd';
import { notification } from 'antd';

type NotificationApi = ReturnType<typeof notification.useNotification>[0];
let api: NotificationApi | undefined;
type NotificationType = 'success' | 'info' | 'warning' | 'error';
export const setNotificationApi = (_api: NotificationApi) => {
  api = _api;
};

export const showNotification = (
  type: NotificationArgsProps['type'],
  message: string,
  description: string,
  placement: NotificationArgsProps['placement'] = 'topRight',
  duration = 2.5,
) => {
  if (!api) {
    console.warn('Notification API chưa được khởi tạo');
    return;
  }

  api[type as NotificationType]({
    message,
    description,
    placement,
    duration,
  });
};
