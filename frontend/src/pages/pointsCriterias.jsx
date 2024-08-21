import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../ui/styledTable";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";
import {
  getPointsCriterias,
  deletePointsCriteria,
} from "../services/pointsCriterias";
import { toast } from "react-toastify";
import AddPointsCriteria from "../components/pointsCriterias/addPointsCriterias";

const HEADER = ["Title", "Points", "Icon", "Description", "Conditions"];

export default function PointsCriterias() {
  const [open, setOpen] = useState(false);
  const [pointsCriteriasData, setPointsCriteriasData] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getPointsCriterias().then((res) => {
      if (res.status) {
        setPointsCriteriasData(
          tableHeaderReplace(
            res.data,
            ["title", "points", "icon", "description", "limit"],
            HEADER
          )
        );
      }
    });
  };

  const deletePointsCriterias = (id) => {
    deletePointsCriteria(id).then((res) => {
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
      deletePointsCriterias(e.data._id);
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <AddPointsCriteria
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isUpdate={editStatus}
        pointsCriteriaData={selectedData}
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
          Points Criterias
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditStatus(false);
            setOpen(true);
          }}
        >
          Add Points Criterias
        </Button>
      </Stack>
      <StyledTable
        header={HEADER}
        data={pointsCriteriasData}
        actions={["Edit", "Delete"]}
        isAction
        onActionClick={handleTableAction}
      />
    </Box>
  );
}
