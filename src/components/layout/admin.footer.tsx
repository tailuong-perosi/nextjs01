'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Tai Luong ©{new Date().getFullYear()} Created by @Tai Luong
            </Footer>
        </>
    )
}

export default AdminFooter;