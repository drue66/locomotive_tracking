import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocomotiveCreateContainer } from '../../../features/locomotiveCreate/containers';
import { LocomotiveUpdateContainer } from '../../../features/locomotiveUpdate/containers';
import LocomotiveListPage from '../../../pages/locomotive/LocomotiveListPage';
import LocomotiveMapPage from '../../../pages/locomotive/LocomotiveMapPage';
import AppLayout from '../AppLayout/AppLayout';

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LocomotiveListPage />}>
            <Route path='add' element={
              <LocomotiveCreateContainer />
            } />
            <Route path=':locomotiveId' element={
              <LocomotiveUpdateContainer />
            } />
          </Route>
          <Route path="/map" element={<LocomotiveMapPage />} />
        </Routes>
        </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter;