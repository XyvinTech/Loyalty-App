import { styled } from "@mui/material";
import { Box } from '@mui/material';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    padding:0,
    margin:0,
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280,
    }
}));


const DashboardLayout = ({children}) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%',
                        minHeight: 'calc(100vh - 64px)',
                        backgroundColor:'primary.background'
                    }}
                >
                    {children? children : <Outlet/>}
                </Box>
            </DashboardLayoutRoot>
            <Navbar onSideBarOpen={()=>{setDrawerOpen(true)}}/>
            <Sidebar onClose={() => setDrawerOpen(false)} open={isDrawerOpen}/>
        </>
    )
}
export default DashboardLayout;