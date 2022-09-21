import { createBrowserRouter, Navigate } from 'react-router-dom';
import { GridView, ListView, MainView, TableView } from './views';

export const rocketBrowserAppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <MainView />,
    children: [
      {
        path: '/',
        element: <Navigate to="list" replace />,
      },
      {
        path: 'list',
        element: <ListView />,
        children: [
          {
            path: '/list',
            element: <Navigate to="grid" replace />,
          },
          {
            path: 'grid',
            element: <GridView />,
          },
          {
            path: 'table',
            element: <TableView />,
          },
        ],
      },
    ],
  },
]);
