import { AccountBalance, Category, Loyalty, Person, SpaceDashboard, SyncAlt, Work ,Logout } from "@mui/icons-material";
import PinIcon from '@mui/icons-material/Pin';
import InfoIcon from '@mui/icons-material/Info';
import UpgradeIcon from '@mui/icons-material/Upgrade';

export const adminNavActions = [
    // {
    //     title:'Dashboard',
    //     href:'dashboard/main',
    //     icon: <SpaceDashboard/>
    // },
    // {
    //     title:'Market Place',
    //     href:'dashboard/market-place',
    //     icon: <SyncAlt/>
    // },
    {
        title:'Transactions',
        href:'dashboard/transaction',
        icon: <SyncAlt/>
    },
    // {
    //     title:'Loyal Cards',
    //     href:'dashboard/loyalcard',
    //     icon: <Loyalty/>
    // },
    {
        title:'Users',
        href:'dashboard/users',
        icon: <Person/>
    },
    {
        title:'Categories',
        href:'dashboard/categories',
        icon: <Category/>
    },
    {
        title:'Brands',
        href:'dashboard/brands',
        icon: <AccountBalance/>
    },
    {
        title:'Merchant Coupons',
        href:'dashboard/coupons',
        icon: <PinIcon/>
    },
    {
        title:'Offers',
        href:'dashboard/discounts',
        icon: <Loyalty/>
    },
    {
        title:'Points Criterias',
        href:'dashboard/points-criterias',
        icon: <InfoIcon/>
    },
    {
        title:'Tiers',
        href:'dashboard/tiers',
        icon: <UpgradeIcon/>
    },
    {
        title:'Logout',
        href:'login',
        icon: <Logout/>,
    }
]

