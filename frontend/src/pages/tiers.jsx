import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../ui/styledTable";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";
import {
 getTiers,
 deleteTier
} from "../services/tier";
import { toast } from "react-toastify";
import AddTire from "../components/tier/addTier";


const HEADER = ["Tier name","Point level"];

export default function Tiers() {
  const [open, setOpen] = useState(false);
  const [tiersData, setTiersData] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [selectedData, setSelectedData] = useState();

  console.log(tiersData)

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getTiers().then((res) => {
      if (res.status) {
        setTiersData(
          tableHeaderReplace(
            res.result,
            ["tierName","pointLevel"],
            HEADER
          )
        );
      }
    });
  };

  const deleteTiers = (id) => {
    deleteTier(id).then((res) => {
      toast.success(res.message);
      init();
    });
  };

  const handleTableAction = (e) => {
    if (e.action === "Edit") {
      setSelectedData(e.data);
      setEditStatus(true);
      setOpen(true);
    } else if (e.action === "Delete") {
      deleteTiers(e.data._id);
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <AddTire
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isUpdate={editStatus}
        tiersData={selectedData}
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
          Tiers
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditStatus(false);
            setOpen(true);
          }}
        >
          Add Tier
        </Button>
      </Stack>
      <StyledTable
        header={HEADER}
        data={tiersData}
        actions={["Edit", "Delete"]}
        isAction
        onActionClick={handleTableAction}
      />
    </Box>
  );
}
