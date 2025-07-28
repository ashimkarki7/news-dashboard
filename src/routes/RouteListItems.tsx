import type { RouteItem } from '@/routes/routes.ts';
import { lazy } from 'react';

export const mainRoutesList: RouteItem[] = [
  {
    key: 1,
    name: 'Dashboard',
    path: '/',
    LazyComponent: lazy(
      () => import('@pages/HomePage/Container/HomePageContainer.tsx')
    ),
    exact: true,
    isPrivate: false,
  },

  {
    key: 4,
    name: 'Not Found',
    path: '*',
    LazyComponent: lazy(() => import('@pages/NotFound/NotFound.tsx')),
    exact: true,
    isPrivate: false,
  },
];
