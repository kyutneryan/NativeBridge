import React, { memo, Suspense } from 'react';
import Loading from '../components/atom/Loading';
import { getIsLoading, getIsLoggedIn, useAppSelector } from '../store';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const AppNavigation = () => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isGlobalLoading = useAppSelector(getIsLoading);

  return (
    <>
      <Suspense fallback={<Loading visible />}>
        {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
      </Suspense>
      <Loading visible={isGlobalLoading} />
    </>
  );
};

export default memo(AppNavigation);
