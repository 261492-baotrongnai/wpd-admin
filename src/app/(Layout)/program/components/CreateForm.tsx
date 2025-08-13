"use client";
import { useState, useTransition } from "react";
import { handleSubmit } from "../../../actions/create_program";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
export default function CreateProgramForm() {
  const [isPending, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(false);

  async function onSubmit(formData: FormData) {
    setDisabled(true);
    startTransition(() => {
      handleSubmit(formData);
    });
  }

  return (
    <form action={onSubmit}>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          // px: { xs: 2, sm: 8 }, // default for xs and sm
          // pl: { md: 2 }, // left padding for md
          // pr: { md: 50 }, // right padding for md
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Typography
            variant="h6"
            fontWeight={400}
            component="label"
            htmlFor="name"
            sx={{
              minWidth: "150px",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "5px",
              alignItems: "flex-center",
            }}
          >
            ชื่อโครงการ :
          </Typography>
          <TextField
            id="name"
            name="name"
            size="small"
            sx={{ flex: 1 }}
            required
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Typography
            variant="h6"
            fontWeight={400}
            component="label"
            htmlFor="eng_name"
            sx={{
              minWidth: "150px",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "5px",
              alignItems: "flex-center",
            }}
          >
            ชื่อภาษาอังกฤษ :
          </Typography>
          <TextField
            id="eng_name"
            name="eng_name"
            size="small"
            sx={{ flex: 1 }}
            required
          />
        </Box>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            loading={isPending}
            loadingPosition="end"
            endIcon={<AddBoxIcon />}
            variant={isPending ? "outlined" : "contained"}
            type="submit"
            disabled={disabled || isPending}
            style={{ width: "180px", height: "40px" }}
          >
            {isPending ? "กำลังสร้าง..." : "สร้างโครงการ"}
          </Button>
        </div>
      </Grid>

      {/* <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        disabled={disabled || isPending}
      >
        สร้างโครงการ
      </Button> */}
    </form>
  );
}
