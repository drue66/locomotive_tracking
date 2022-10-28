import { Card, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { FC, ReactNode } from 'react';
import styles from './MainLayout.module.css';

const { Header, Content } = Layout;

interface Props {
  menu: ItemType[];
  children: ReactNode;
}

const MainLayout: FC<Props> = (props) => {
  const { children, menu } = props;

  return (
    <Layout className={styles.layout}>
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={menu}
      />
    </Header>
    <Content className={styles.content}>
      <Card>
        {children}
      </Card>
    </Content>
  </Layout>
  );
};

export default MainLayout;