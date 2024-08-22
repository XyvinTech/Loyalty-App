import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../../pages/login";
import DashboardLayout from "../../layout/dashboardLayout";
import Error404 from "../../pages/404";
import Transaction from "../../pages/transaction";
import Loyalcard from "../../pages/loyalcard";
import Dashboard from "../../pages/dashboard";
import Users from "../../pages/users";
import Categories from "../../pages/categories";
import Brands from "../../pages/brands";
import ProtectedRoute from "../../utils/ProtectedRoute";
import { Discounts } from "../../pages/discounts";
import PointsCriterias from "../../pages/pointsCriterias";
import Tiers from "../../pages/tiers";
import Coupons from "../../pages/coupons.jsx"
import Apps from "../../pages/apps.jsx";

export const RoutesConfig = () => {
  return [
    {
      path: "/",
      // element: <Navigate to='/login' replace />
      element: <Navigate to="/dashboard/transaction" replace />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/error404",
      element: <Error404 />,
    },
    {
      path: "*",
      element: <Navigate to={"/error404"} />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "main",
          element: <Dashboard />,
        },
        {
          path: "transaction",
          element: <Transaction />,
        },
        {
          path: "loyalcard",
          element: <Loyalcard />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "apps",
          element: <Apps />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
        {
          path: "coupons",
          element: <Coupons />,
        },
        {
          path: "discounts",
          element: <Discounts />,
        },
        {
          path: "points-criterias",
          element: <PointsCriterias />,
        },
        {
          path: "tiers",
          element: <Tiers />,
        },
        {
          path: "*",
          element: <Navigate to={"/error404"} />,
        },
      ],
    },
  ];
};
