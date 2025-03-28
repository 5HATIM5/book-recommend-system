import React from "react";
import { Box } from "@mui/material";

/**
 * PolygonBottom component to render a blurred polygon shape at the bottom of the page.
 */
const PolygonBottom: React.FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0 auto auto 0",
        top: { xs: "calc(100% - 13rem)", sm: "calc(100% - 30rem)" },
        zIndex: -10,
        transform: "translateX(-50%)",
        overflow: "hidden",
        filter: "blur(60px)",
        backdropFilter: "blur(50px)",
        left: { xs: "calc(50% + 3rem)", sm: "calc(50% + 36rem)" },
        width: { xs: "36.125rem", sm: "72.1875rem" },
        aspectRatio: "1155 / 678",
        background: "linear-gradient(to top right, #ff80b5, #9089fc)",
        opacity: 0.3,
        clipPath:
          "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
      }}
      aria-hidden="true"
    />
  );
};

export default PolygonBottom;
