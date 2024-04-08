import { Loyalty, Person, SpaceDashboard, Work } from "@mui/icons-material";

export const adminNavActions = [
    {
        title:'Dashboard',
        href:'dashboard/main',
        icon: <SpaceDashboard/>
    },
    {
        title:'Transactions',
        href:'dashboard/transaction',
        icon: <Work/>
    },
    {
        title:'Loyal Cards',
        href:'dashboard/loyalcard',
        icon: <Loyalty/>
    },
    {
        title:'Users',
        href:'dashboard/users',
        icon: <Person/>
    }
]