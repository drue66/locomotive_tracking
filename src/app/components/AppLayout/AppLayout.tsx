import { ItemType } from "antd/lib/menu/hooks/useItems";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../../shared/layouts/MainLayout/MainLayout";

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = (props) => {
  const { children } = props;

  const menu: ItemType[] = [
    {
      key: 'home',
      label: <Link to={'/'}>Список</Link>
    },
    {
      key: 'map',
      label: <Link to={'/map'}>Карта</Link>
    },
  ];

  return (
    <MainLayout menu={menu}>
      {children}
    </MainLayout>
  )
};

export default AppLayout;