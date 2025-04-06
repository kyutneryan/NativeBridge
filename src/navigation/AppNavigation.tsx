import React from 'react';
import Loading from '../components/atom/Loading';
import { getIsLoading, getIsLoggedIn, useAppSelector } from '../store';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const AppNavigation = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isGlobalLoading = useAppSelector(getIsLoading);

  return (
    <>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
      <Loading visible={isGlobalLoading} />
    </>
  );
};

export default AppNavigation;
