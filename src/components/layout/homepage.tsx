'use client'

import { Button, Card, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect } from 'react';

const { Title, Paragraph } = Typography;

const destinations = [
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    desc: 'Thành phố của ánh sáng, tình yêu và nghệ thuật.'
  },
  {
    name: 'Santorini',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    desc: 'Hòn đảo thiên đường với biển xanh và nhà trắng.'
  },
  {
    name: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    desc: 'Nét đẹp cổ kính, hoa anh đào và đền chùa yên bình.'
  },
  {
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    desc: 'Thành phố không ngủ, trung tâm của thế giới hiện đại.'
  },
  {
    name: 'Paris1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    desc: 'Thành phố của ánh sáng, tình yêu và nghệ thuật.'
  },
  {
    name: 'Santorini2',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    desc: 'Hòn đảo thiên đường với biển xanh và nhà trắng.'
  },
  {
    name: 'Kyoto1',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    desc: 'Nét đẹp cổ kính, hoa anh đào và đền chùa yên bình.'
  },
  {
    name: 'New York2',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    desc: 'Thành phố không ngủ, trung tâm của thế giới hiện đại.'
  },
];

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let interval: NodeJS.Timeout;
    let isUserScrolling = false;
    let scrollAmount = 300; // px per scroll

    const onUserScroll = () => {
      isUserScrolling = true;
      clearTimeout((onUserScroll as any).timeoutId);
      (onUserScroll as any).timeoutId = setTimeout(() => {
        isUserScrolling = false;
      }, 2000);
    };
    container.addEventListener('scroll', onUserScroll);

    interval = setInterval(() => {
      if (isUserScrolling) return;
      if (!container) return;
      // If at end, scroll back to start
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 1500);

    return () => {
      clearInterval(interval);
      container.removeEventListener('scroll', onUserScroll);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)', overflow: 'hidden' }}>
      {/* Hero Section */}
      <div style={{
        width: '100%',
        minHeight: 420,
        background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff',
        textShadow: '0 4px 24px rgba(0,0,0,0.25)',
        padding: '64px 16px 48px 16px',
      }}>
        <Title style={{ color: '#fff', fontWeight: 800, fontSize: 48, marginBottom: 16, textAlign: 'center', letterSpacing: 2 }}>
          Khám phá thế giới cùng Tài Lương
        </Title>
        <Paragraph style={{ color: '#fff', fontSize: 20, maxWidth: 600, textAlign: 'center', marginBottom: 32 }}>
          Đặt chân đến những điểm đến mơ ước, trải nghiệm văn hóa, ẩm thực và cảnh đẹp tuyệt vời trên khắp hành tinh.
        </Paragraph>
        <Button type="primary" size="large" style={{ background: '#185a9d', borderColor: '#185a9d', fontWeight: 600, fontSize: 18, padding: '0 32px' }} onClick={() => router.push('/auth/login')}>
          Bắt đầu hành trình
        </Button>
      </div>
      {/* Destinations Section */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 16px' }}>
        <Title level={2} style={{ textAlign: 'center', color: '#185a9d', fontWeight: 700, marginBottom: 40 }}>
          Điểm đến nổi bật
        </Title>
        <div
          style={{
            display: 'flex',
            gap: 32,
            overflowX: 'auto',
            paddingBottom: 16,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="hide-scrollbar"
          ref={scrollRef}
        >
          {destinations.map((dest, idx) => (
            <div key={dest.name} style={{ minWidth: 270, flex: '0 0 270px', maxWidth: 320 }}>
              <Card
                hoverable
                className={`card-fade-in card-hover-lift`}
                cover={<img alt={dest.name} src={dest.image} style={{ height: 180, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />}
                style={{ borderRadius: 12, boxShadow: '0 4px 24px rgba(24,90,157,0.10)', animationDelay: `${idx * 0.15 + 0.1}s` }}
              >
                <Title level={4} style={{ marginBottom: 8, color: '#185a9d', fontWeight: 700 }}>{dest.name}</Title>
                <Paragraph style={{ color: '#3a3a5a', opacity: 0.8 }}>{dest.desc}</Paragraph>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

