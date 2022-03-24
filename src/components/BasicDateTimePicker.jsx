import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function NativePickers({ changeDate, date_to_be_done }) {
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        label="To be done"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={date_to_be_done != "not limited" ? date_to_be_done : ""}
        onChange={(e) => {
          changeDate(e.target.value);
        }}
      />
    </Stack>
  );
}
