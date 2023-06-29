'use client'

import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import { HomeOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { token: { colorBgContainer }, } = theme.useToken();

  const [breadcrumb, setBreadcrumb] = useState("Home");

  function getItem(label, icon) {
    return { icon, label };
  }

  const items = [
    getItem("Home", <HomeOutlined />),
    getItem("Registration", <FormOutlined />),
    getItem("Customer List", <UserOutlined />),
  ];

  const onClickMenu = (e) => {
    if (e.key === "tmp-0") {
      setBreadcrumb("Home");
      router.push('/');
    }
    else if (e.key === "tmp-1") {
      setBreadcrumb("Registration");
      router.push('/registration');
    }
    else if (e.key === "tmp-2") {
      setBreadcrumb("Customer List");
      router.push('/userList');
    }
  };
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['3']}
          onClick={onClickMenu}
          items={items}
        />
      </Sider>
      <Layout>
        <Header className='logo' />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
            }}
          >
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Irdina Amirah ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
