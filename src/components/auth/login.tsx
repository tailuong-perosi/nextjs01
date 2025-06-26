'use client'
import React, { useState } from 'react';
import { Button, Form, Input, Typography, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from './register.module.scss';
import { showNotification } from '@/utils/notification.util';
import { getAxiosErrorMessage } from '@/utils/error.util';

const { Title, Paragraph } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const res = await AuthService.loginHandle(email, password);
      if (res.statusCode === 201) {
        showNotification('success', 'Đăng nhập thành công', res.message || '');
        router.push('/dashboard');
      }
    } catch (error) {
      const msg = getAxiosErrorMessage(error);
      showNotification('error', 'Đăng nhập thất bại', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerBg}>
      <div className={styles.illustration}>
        <img src="https://cdn.pixabay.com/photo/2021/07/26/07/32/travel-6493621_1280.jpg" alt="Login Illustration" />
      </div>
      <div className={styles.registerFormWrapper}>
        <Title level={3} className={styles.registerTitle}>
          Đăng nhập tài khoản
        </Title>
        <Paragraph className={styles.registerDesc}>
          Đăng nhập để quản lý sản phẩm, bảo mật và tiện lợi hơn.
        </Paragraph>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ email: '', password: '' }}
          style={{ width: '100%' }}
        >
          <Form.Item
            className={styles.formItem}
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" autoComplete="email" size="large" />
          </Form.Item>
          <Form.Item
            className={styles.formItem}
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" autoComplete="current-password" size="large" />
          </Form.Item>
          <Form.Item className={styles.formItem} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" block size="large" style={{ background: "#185a9d", borderColor: "#185a9d", fontWeight: 600, letterSpacing: 1 }} loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center', margin: '12px 0' }}>
          <Link href="/" className={styles.loginLink}>
            Quay lại trang chủ
          </Link>
        </div>
        <div style={{ textAlign: 'center', margin: '12px 0' }}>
          Chưa có tài khoản?{' '}
          <Link href="/auth/register" className={styles.loginLink}>
            Đăng ký tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;