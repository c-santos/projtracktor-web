import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomePage from './HomePage';
import Profile from './Profile';
import BasePage from './BasePage';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <BasePage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
