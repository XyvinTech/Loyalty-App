import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../ui/styledTable";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";
import {
  getUsers,
  deleteUser,
} from "../services/users";
import { toast } from "react-toastify";
import AddUser from "../components/users/addUser";

const HEADER = [
  "Email",
  "Phone Number",
  "Company",
  "Points",
  "Tier",
  "Referral Code",
];

export default function Users() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getUsers().then((res) => {
      if (res.status) {

        const transformedData = res.result.map(user => ({
          _id:user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          clientCompany: user.clientCompany,
          points: user.points,
          tier: user.tier?.tier_name || "Basic", // Safely access tier_name
          referralCode: user.referralCode,
        }));

        setUserData(
          tableHeaderReplace(
            transformedData,
            [
              "email",
              "phoneNumber",
              "clientCompany",
              "points",
              "tier",
              "referralCode",
            ],
            HEADER
          )
        );
      }
    });
  };

  const deleteUsers = (id) => {
    deleteUser(id).then((res) => {
      toast.success(res.message);
      init();
    });
  };

  const handleTableAction = (e) => {
    if (e.action === "Edit") {
      setSelectedData(e.data);
      setEditStatus(true);
      setOpen(true);
    }
    else if (e.action === 'Delete'){
      deleteUsers(e.data._id)
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <AddUser
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isUpdate={editStatus}
        userData={selectedData}
        isSubmitted={init}
      />
      <Stack
        direction={"row"}
        sx={{
          p: 2,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "0 0 15px #ccc",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "secondary.contrastText" }}
        >
          Customers
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditStatus(false);
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </Stack>
      <StyledTable
        header={HEADER}
        data={userData}
        actions={["Edit", "Delete"]}
        isAction
        onActionClick={handleTableAction}
      />
    </Box>
  );
}
