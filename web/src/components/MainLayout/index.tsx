import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from '../MainNavbar';

function MainLayout({ children }:any) {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
}
export default MainLayout;
