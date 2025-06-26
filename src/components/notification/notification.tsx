'use client';
import React, { useEffect } from 'react';
import { notification } from 'antd';
import { setNotificationApi } from '@/utils/notification.util';

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setNotificationApi(api);
  }, [api]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};
