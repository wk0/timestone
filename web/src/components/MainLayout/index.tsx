import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from '../MainNavbar';

type MainLayoutProps = {
  children: React.ReactNode,
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
}
export default MainLayout;
