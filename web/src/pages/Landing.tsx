import { useEffect, Suspense, lazy } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import HeroContent from '../components/HeroContent';
import InputBox from '../components/InputBox';

const Loadable = (Component:any) => (props:any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Explore
const Explore = Loadable(lazy(() => import('./Explore')));

function Landing () {

  return (
    <>
      <div>
        <HeroContent />
        <InputBox />
      </div>
    </>
  );
}

export default Landing;
