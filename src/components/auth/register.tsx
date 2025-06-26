'use client'
import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, notification, NotificationArgsProps, Row, Typography, Upload } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import styles from "./register.module.scss";
import { showNotification } from '@/utils/notification.util';
import { getAxiosErrorMessage } from '@/utils/error.util';

const { Title, Paragraph } = Typography;

const illustrationUrl =
  "https://cdn.pixabay.com/photo/2021/07/26/07/32/travel-6493621_1280.jpg";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      const { username, password, email, phone } = values
      const res = await AuthService.registerHandle(username, password, phone, email)
      if (res.statusCode === 201) {
        showNotification('success', 'Đăng ký thành công', res.message);
        router.push(`/auth/verify-mail?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      const msg = getAxiosErrorMessage(error);
      showNotification('error', 'Đăng ký thất bại', msg);
    }
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
      </div>
    </div>

  )
}

export default Register;