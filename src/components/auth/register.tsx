'use client'
import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, notification, Row, Typography, Upload } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import styles from "./register.module.scss";

const { Title, Paragraph } = Typography;

const illustrationUrl =
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const onFinish = async (values: any) => {

    const { username, password, email, phone } = values
    const res = await AuthService.registerHandle(username, password, phone, email)
    if (res.statusCode === 201) {
      openNotification('success', 'Đăng ký thành công', res.message);
      // router.push('/dashboard');
    }else {
      openNotification('error', 'Đăng ký thất bại', res.message);
    }
  };
  const openNotification = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    description: string,
  ) => {
    notification[type]({
      message,
      description,
      placement: 'topRight',
      duration: 2.5,
    });
  };


  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div className={styles.registerBg}>
      <div className={styles.illustration}>
        <img src={illustrationUrl} alt="Register Illustration" />
      </div>
      <div className={styles.registerFormWrapper}>
        <Title level={3} className={styles.registerTitle}>
          Đăng ký tài khoản
        </Title>
        <Paragraph className={styles.registerDesc}>
          Tạo tài khoản để trải nghiệm quản lý sản phẩm chuyên nghiệp, bảo mật và tiện lợi hơn.
        </Paragraph>
        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ email: "", username: "", password: "", phone: "" }}
          style={{ width: "100%" }}
        >
          <Form.Item
            className={styles.formItem}
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" autoComplete="email" size="large" />
          </Form.Item>
          <Form.Item
            className={styles.formItem}
            label="Tên hiển thị"
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              { min: 4, message: "Tên đăng nhập tối thiểu 4 ký tự!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên hiển thị" autoComplete="username" size="large" />
          </Form.Item>
          <Form.Item
            className={styles.formItem}
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" autoComplete="new-password" size="large" />
          </Form.Item>
          <Form.Item
            className={styles.formItem}
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              { pattern: /^\d{9,11}$/, message: "Số điện thoại không hợp lệ!" },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" autoComplete="tel" size="large" />
          </Form.Item>
          <Form.Item
            className={styles.formItem}
            label="Ảnh đại diện"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Chỉ nhận 1 ảnh, định dạng jpg/png."
          >
            <Upload
              className={styles.uploadAvatar}
              name="avatar"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              accept="image/png, image/jpeg"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item className={styles.formItem} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" block size="large" style={{ background: "#185a9d", borderColor: "#185a9d", fontWeight: 600, letterSpacing: 1 }}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={() => openNotification('success', 'Test', 'Notification test')}>
  Test Notification
</Button>
      </div>
    </div>

  )
}

export default Register;