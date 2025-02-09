import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomePage from './HomePage';
import Profile from './Profile';
import BasePage from './BasePage';
import { ProjectPage } from './ProjectPage';

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
            {
                path: '/projects/:projectId',
                element: <ProjectPage />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
