import type { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../hoc/PrivateRoute.tsx';
import { mainRoutesList } from './RouteListItems.tsx';
import PublicBasedRoute from '../hoc/PublicRoute.tsx';
import type { RouteItem } from '@routes/routes.ts';

const parseRoutes = (routeList: RouteItem[]): ReactNode => (
  <Routes>
    {routeList.map((route) =>
      route.isPrivate ? (
        <Route
          key={route.key}
          path={route.path}
          element={
            <PrivateRoute>
              <route.LazyComponent />
            </PrivateRoute>
          }
        />
      ) : (
        <Route
          key={route.key}
          path={route.path}
          element={
            <PublicBasedRoute>
              <route.LazyComponent />
            </PublicBasedRoute>
          }
        />
      )
    )}
  </Routes>
);

export const mainRoutes = parseRoutes(mainRoutesList);
