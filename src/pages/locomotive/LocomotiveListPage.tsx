import { Button, Modal } from 'antd';
import { FC } from 'react';
import { Link, Outlet, Route, useNavigate } from 'react-router-dom';
import { LocomotiveTableContainer } from '../../features/locomotiveList/containers';

const LocomotiveListPage: FC = () => {
  const navigate = useNavigate();

  const handleAddBtnClick = () => {
    navigate('./add');
  };

  return (
    <>
      <LocomotiveTableContainer />
      <Button type='primary' onClick={handleAddBtnClick} style={{ marginTop: 20 }}>
        Добавить локомотив
      </Button>
      <Outlet />
    </>
  );
};

export default LocomotiveListPage;