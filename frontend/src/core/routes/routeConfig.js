import React from "react"
import { Navigate } from "react-router-dom"
import Login from "../../pages/login"
import DashboardLayout from "../../layout/dashboardLayout"
import Error404 from "../../pages/404"
import Transaction from "../../pages/transaction"
import Loyalcard from "../../pages/loyalcard"

export const RoutesConfig = () => {

    return [
        {
            path: '/',
            // element: <Navigate to='/login' replace />
            element: <Navigate to='/dashboard' replace />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/error404',
            element: <Error404 />,
        },
        {
            path: '*',
            element: <Navigate to={"/error404"} />,
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'transaction',
                    element: <Transaction />,
                },
                {
                    path: 'loyalcard',
                    element: <Loyalcard />,
                },
                {
                    path: '*',
                    element: <Navigate to={"/error404"} />,
                }
            ]
        }
    ]
}