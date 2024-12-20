import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "./App";
import Profile from "./Profile";
import BasePage from "./BasePage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <BasePage />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/profile',
                element: <Profile />
            },
        ]
    }
]

export const router = createBrowserRouter(routes)

