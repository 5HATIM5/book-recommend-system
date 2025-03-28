import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

const Loader = () => {
  const [open, setOpen] = useState(true);

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default Loader;
