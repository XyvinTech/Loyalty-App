import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../ui/styledTable";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";
import { getDiscounts, deleteDiscount } from "../services/discount";
import { toast } from "react-toastify";
import AddDiscount from "../components/discount/addDiscount";

const HEADER = [
  "Title",
  "Discount Code",
  "Description",
  "Percentage",
  // "Image",
  "Tier Required",
  "Valid From",
  "Valid To",
  "Status",
];

export function Discounts() {
  const [open, setOpen] = useState(false);
  const [discountsData, setDisountData] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [selectedData, setSelectedData] = useState();

  console.log(discountsData);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getDiscounts().then((res) => {
      if (res.status) {
        setDisountData(
          tableHeaderReplace(
            res.result,
            [
              "title",
              "discountCode",
              "description",
              "percentage",
              // "image",
              "tierRequired",
              "validFrom",
              "validTo",
              "status",
            ],
            HEADER
          )
        );
      }
    });
  };

  const deleteDiscounts = (id) => {
    deleteDiscount(id).then((res) => {
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
      deleteDiscounts(e.data._id);
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <AddDiscount
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isUpdate={editStatus}
        discountsData={selectedData}
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
          Discounts
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditStatus(false);
            setOpen(true);
          }}
        >
          Add Discount
        </Button>
      </Stack>
      <StyledTable
        header={HEADER}
        data={discountsData}
        actions={["Edit", "Delete"]}
        isAction
        onActionClick={handleTableAction}
      />
    </Box>
  );
}
