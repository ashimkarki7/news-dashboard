import type { JSX } from 'react';
import PageLayout from '@common/Layout/PageLayout';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default PrivateRoute;
