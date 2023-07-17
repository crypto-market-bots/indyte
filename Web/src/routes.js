import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { useEffect, useState } from 'react';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DashboardCrmPage from './pages/DashBoardCrmPage';
import Protected from './Protected';
import ChangePasswordPage from './pages/ChangePasswordPage';
import DietitianPage from './pages/DietitianPage';
// ----------------------------------------------------------------------

export default function Router() { 
  const [route, setRoute] = useState("/dashboard/app");
  useEffect(()=>{
    const login =localStorage.getItem('token')
    if(!login){
      setRoute("/login")
    }
  })


  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/crm" />, index: true },
        { path: 'crm', element: <DashboardCrmPage /> },
        { path: 'dietitian', element: <DashboardAppPage /> },
        // { path: 'user', element: <UserPage /> },
        { path: 'user/customer', element: <UserPage /> },
        { path: 'user/dietitian', element: <DietitianPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {path: 'forgot-password', element: <ForgotPasswordPage /> },
    {path: 'change-password', element: <ChangePasswordPage /> },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/crm" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/',
      element: <Protected Component={DashboardLayout}/>,
    },
  ]);

  return routes;
}
