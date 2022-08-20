import { useEffect, Suspense, lazy } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import HeroContent from '../components/HeroContent';
import InputBox from '../components/InputBox';
import Explore from './Explore';

function Landing () {

  return (
    <>
      <div>
        <HeroContent />
        <InputBox />
        <Explore />
      </div>
    </>
  );
}

export default Landing;
