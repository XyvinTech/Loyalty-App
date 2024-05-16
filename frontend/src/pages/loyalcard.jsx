import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../ui/styledTable";
import AddLoyalty from "../components/loyaltycard/addloyalty";
import { deleteLoyalityCard, getLoyalityCard, getLoyalityCardById } from "../services/loyaltyCard";
import { tableHeaderReplace } from "../utils/tableHeaderReplace";

const HEADER = [
  "Logo",
  "Name",
  "Brand",
  "Worth",
  "OTP",
  "Expiry",
  "Number of Coupons",
  "Category",
  "Status",
];

export default function Loyalcard() {
  const [open, setOpen] = useState(false);
  const [loyalityCards, setLoyalityCards] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getLoyalityCard().then((res) => {
      if (res.status) {
        setLoyalityCards(
          tableHeaderReplace(
            res.result,
            [
              "image",
              "title",
              "brand",
              "coin_worth",
              "OTP",
              "expiry",
              "no_of_cards",
              "category",
              "status",
            ],
            HEADER
          )
        );
      }
    });
  };

  const handleTableAction = async (e) => {
    if (e.action === "Edit") {
        let selectedCard = await getLoyalityCardById(e.data._id);
      setSelectedData(selectedCard.data);
      console.log('editStatus',selectedCard.data)
      setEditStatus(true);
      setOpen(true);
    } else if (e.action === "Delete") {
        
      await deleteLoyalityCard(e.data._id);
      init();
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <AddLoyalty
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        isUpdate={editStatus}
        loyalityData={selectedData}
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
          Loyal Cards
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#c83c4f" }}
          onClick={() => {
            setEditStatus(false);
            setOpen(true);
          }}
        >
          Add Card
        </Button>
      </Stack>
      <StyledTable
        header={HEADER}
        data={loyalityCards}
        actions={["Edit", "Delete"]}
        isAction
        onActionClick={handleTableAction}
      />
    </Box>
  );
}
