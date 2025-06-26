'use client'
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AuthService } from '@/services/auth.service';
import { showNotification } from '@/utils/notification.util';
import { getAxiosErrorMessage } from '@/utils/error.util';
import styles from "./register.module.scss";

const { Title, Paragraph, Text } = Typography;

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    
    // Get email from URL params or use a default
    const email = searchParams.get('email') || 'user@example.com';

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const { verificationCode } = values;
            const res = await AuthService.verifyMail(email, verificationCode)
            if(res.statusCode === 200){
                showNotification('success', 'Xác minh thành công', res.message);
            router.push('/auth/login');
            }
        } catch (error) {
            const msg = getAxiosErrorMessage(error);
            showNotification('error', 'Xác minh thất bại', msg);
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            const res = await AuthService.sendMail(email)
            if(res.statusCode === 200){
                showNotification('success', 'Gửi mã thành công', res.message);
            }
        } catch (error) {
            const msg = getAxiosErrorMessage(error);
            showNotification('error', 'Gửi mã thất bại', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerBg}>
            <div className={styles.illustration}>
                <img src="https://cdn.pixabay.com/photo/2021/07/26/07/32/travel-6493621_1280.jpg" alt="Verify Illustration" />
            </div>
            <div className={styles.registerFormWrapper}>
                <Title level={3} className={styles.registerTitle}>
                    Xác thực email
                </Title>
                <Paragraph className={styles.registerDesc}>
                    Mã xác thực đã được gửi đến email của bạn. Vui lòng kiểm tra email và nhập mã vào ô bên dưới.
                </Paragraph>
                <Form
                    name="verify-email"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    style={{ width: '100%' }}
                >
                    <Form.Item
                        className={styles.formItem}
                        label="Mã xác thực"
                        name="verificationCode"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã xác thực!' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Nhập mã xác thực"
                            size="large"
                            style={{ textAlign: 'center', fontSize: 18, letterSpacing: 4, width: '100%', minWidth: 250 }}
                        />
                    </Form.Item>
                    <Form.Item className={styles.formItem} style={{ marginTop: 24 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            style={{ background: '#185a9d', borderColor: '#185a9d', fontWeight: 600, letterSpacing: 1 }}
                            loading={loading}
                            icon={<CheckCircleOutlined />}
                        >
                            Xác thực email
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', margin: '12px 0' }}>
                    <Button type="link" onClick={handleResendCode} loading={loading} style={{ padding: 0 }}>
                        Gửi lại mã xác thực
                    </Button>
                </div>
                {/* <div style={{ textAlign: 'center', margin: '12px 0' }}>
                    <Link href="/auth/login" className={styles.loginLink}>
                        <ArrowLeftOutlined style={{ marginRight: 4 }} />
                        Quay lại đăng nhập
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

export default VerifyEmail;
