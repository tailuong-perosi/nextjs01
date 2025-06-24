'use client'
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const onFinish = async (values: any) => {
        const {username, password} = values
        const res = await AuthService.loginHandle(username, password)
        if(res.statusCode === 201){
            router.push('/dashboard');
        }
    };

    return (
        <div className="login-bg travel-bg">
            <div className="login-slogan">
                <span role="img" aria-label="plane" className="travel-icon">✈️</span>
                <span className="slogan-text">Khám phá thế giới cùng chúng tôi!</span>
                <span role="img" aria-label="sun" className="travel-icon">🌞</span>
            </div>
            <Row justify={"center"} align="middle" style={{ minHeight: "100vh" }}>
                <Col xs={24} md={16} lg={8}>
                    <div className="login-card glass-card">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
                            <Image src="/globe.svg" alt="Travel Globe" width={56} height={56} />
                            <h2 style={{ margin: '16px 0 0 0', fontWeight: 700, fontSize: 28, color: '#3a3a5a', letterSpacing: 1 }}>Đăng Nhập</h2>
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                            style={{ marginTop: 16 }}
                        >
                            <Form.Item
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input className="login-input" placeholder="Nhập email..." />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password className="login-input" placeholder="Nhập mật khẩu..." />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 8 }}>
                                <Button type="primary" htmlType="submit" className="login-btn">
                                    <SendOutlined style={{ marginRight: 8 }} />Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ textAlign: 'center', margin: '12px 0' }}>
                            <Link href="/" className="login-link">
                                <ArrowLeftOutlined style={{ marginRight: 4 }} />
                                Quay lại trang chủ
                            </Link>
                        </div>
                        <Divider style={{ margin: '16px 0' }} />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản? <Link href={"/auth/register"} className="login-link">Đăng ký tại đây</Link>
                        </div>
                        <span className="corner-icon" role="img" aria-label="luggage">🧳</span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Login;