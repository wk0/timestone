import { Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';
import Landing from './pages/Landing';
import { Outlet } from 'react-router-dom';

const Loadable = (Component: any) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Home Page
const LandingPage = Loadable(lazy(() => import('./pages/Landing')));

// Mint Page
const MintPage = Loadable(lazy(() => import('./pages/Mint')));

// Explore Page
const ExplorePage = Loadable(lazy(() => import('./pages/Explore')));

// Timestone (Detail View) Page
const TimestonePage = Loadable(lazy(() => import('./pages/Timestone')));

const routes = [
  {
    path: '*',
    element: (
      <>
        <MainLayout />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/timestone/:id',
        element: <TimestonePage />
      },
      {
        path: '/explore',
        element: <ExplorePage />
      },
      {
        path: '/mint',
        element: <MintPage />
      },
    ]
  }
];

export default routes;
