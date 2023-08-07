import React, {useState} from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Link, Outlet} from 'react-router-dom';
import {AiOutlineUser, AiOutlineVideoCamera} from 'react-icons/ai';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem('Dashboard', '1', <PieChartOutlined />),
//   getItem('Categorys', '2', <DesktopOutlined />),
//   getItem('Products', '3', <DesktopOutlined /> ),


// ];

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  return (
    <div  className='h-screen'>
    <Layout style={{minHeight: '100vh'}} >
      <Sider collapsible 
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}      >
          
        <div className="demo-logo-vertical"  />

        <h1 className='text-white text-center mt-3'>Admin</h1>
        <Menu className='h-screen' 
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AiOutlineUser />,
              label: <Link to="/admin/dashboard">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <AiOutlineVideoCamera />,
              label: <Link to="/admin/products">Product</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineVideoCamera />,
              label: <Link to="/admin/category">category</Link>,
            },
          ]}
        />
      </Sider>
      <Layout >
        <Header style={{padding: 0, background: colorBgContainer}} />
        <Content style={{margin: '0 16px', }}>
          <Breadcrumb style={{margin: '16px 0'}}>
          </Breadcrumb>
          <div className='h-screen' style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
    </div>
  );
};

export default LayoutAdmin;