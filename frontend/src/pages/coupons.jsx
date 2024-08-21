import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../ui/styledTable";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";
import {
 getCoupons,
 deleteCoupon
} from "../services/coupon";
import { toast } from "react-toastify";
import AddCoupon from "../components/coupon/addCoupon";

const HEADER = ["Image","Title","Description",'Brand',"PIN",'Points Required','Starts From','Expiry','Availability Criteria','Category','Status'];

export default function Coupons() {
  const [open, setOpen] = useState(false);
  const [couponsData, setCouponsData] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [selectedData, setSelectedData] = useState();


  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getCoupons().then((res) => {
      if (res.status) {
        setCouponsData(
          tableHeaderReplace(
            res.result,
            ["image","title","description",'brand',"pin",'pointsRequired','startsFrom','expiry','availabilityCriteria','category','status'],
            HEADER
          )
        );
      }
    });
  };


  const deleteCoupons = (id) => {
    deleteCoupon(id).then((res) => {
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
      deleteCoupons(e.data._id);
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <AddCoupon
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isUpdate={editStatus}
        couponsData={selectedData}
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
          Coupons
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditStatus(false);
            setOpen(true);
          }}
        >
          Add Coupon
        </Button>
      </Stack>
      <StyledTable
        header={HEADER}
        data={couponsData}
        actions={["Edit", "Delete"]}
        isAction
        onActionClick={handleTableAction}
      />
    </Box>
  );
}
