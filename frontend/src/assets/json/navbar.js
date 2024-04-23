import { AccountBalance, Category, Loyalty, Person, SpaceDashboard, SyncAlt, Work } from "@mui/icons-material";

export const adminNavActions = [
    {
        title:'Dashboard',
        href:'dashboard/main',
        icon: <SpaceDashboard/>
    },
    {
        title:'Transactions',
        href:'dashboard/transaction',
        icon: <SyncAlt/>
    },
    {
        title:'Loyal Cards',
        href:'dashboard/loyalcard',
        icon: <Loyalty/>
    },
    // {
    //     title:'Users',
    //     href:'dashboard/users',
    //     icon: <Person/>
    // },
    {
        title:'Categories',
        href:'dashboard/categories',
        icon: <Category/>
    },
    {
        title:'Brands',
        href:'dashboard/brands',
        icon: <AccountBalance/>
    }
]