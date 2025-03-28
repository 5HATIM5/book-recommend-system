import { useState, useEffect } from "react";
import { Alert, Slide } from "@mui/material";

interface ErrorAlertProps {
  message: string;
  duration?: number;
}

const StatusAlert = ({ message, duration = 3000 }: ErrorAlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Slide direction="down" in={visible} mountOnEnter unmountOnExit>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "42%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          minWidth: "200px",
        }}
      >
        <Alert severity="error" onClose={() => setVisible(false)}>
          {message}
        </Alert>
      </div>
    </Slide>
  );
};

export default StatusAlert;
