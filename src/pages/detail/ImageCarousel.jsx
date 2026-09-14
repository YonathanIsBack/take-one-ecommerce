import { useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", borderRadius: 2 }}>
        <Box
          component="img"
          src={images[current]}
          alt="Product"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {images.length > 1 && (
          <>
            <IconButton
              onClick={prev}
              sx={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,0.8)" }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={next}
              sx={{ position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,0.8)" }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
      <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: "center" }}>
        {images.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img}
            alt={`Thumb ${i + 1}`}
            onClick={() => setCurrent(i)}
            sx={{
              width: 64,
              height: 64,
              objectFit: "cover",
              borderRadius: 1,
              cursor: "pointer",
              border: i === current ? "2px solid #5D4037" : "2px solid transparent",
              opacity: i === current ? 1 : 0.6,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
