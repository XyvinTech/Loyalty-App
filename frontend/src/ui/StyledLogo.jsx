import React from "react";
import Avatar from "@mui/material/Avatar";

const StyledLogo = ({ avatarUrl, bgColor, avatarSize }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ bgcolor: bgColor, width: avatarSize, height: avatarSize }} src={avatarUrl} />
    </div>
  );
};

export default StyledLogo;
