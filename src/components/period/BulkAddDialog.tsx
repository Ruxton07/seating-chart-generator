import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import StudentRow from "./StudentRow";

export default function BulkAddDialog() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const [text, setText] = useState("");
  return (
    <>
      <Dialog open={open} onClose={close}>
        <div>
          <div className="mr-16">
            <DialogTitle>Bulk Add</DialogTitle>
          </div>
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent dividers>
            <div className="w-96">
              <TextField
                fullWidth
                label="Student Roster"
                multiline
                minRows={4}
                variant="filled"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setText(event.target.value);
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <p>This will add 5 students.</p>
            <Button autoFocus onClick={() => {}}>
              Confirm Bulk Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Bulk Add
      </button>
    </>
  );
}
