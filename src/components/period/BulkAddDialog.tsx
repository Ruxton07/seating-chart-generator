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

// Prop type for addStudent function
interface BulkAddDialogProps {
  addStudent: (studentName: string) => void;
}

export default function BulkAddDialog({ addStudent }: BulkAddDialogProps) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const close = () => setOpen(false);

  const handleConfirm = () => {
    // Split text by new lines and trim each line
    const studentNames = text.split('\n').map(name => name.trim());
    studentNames.forEach(name => {
      if (name) { //Check if name is not just whitespace
        addStudent(name);
      }
    });
    close(); // Close the dialog
  }
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
            <Button autoFocus onClick={handleConfirm}>
              Confirm Bulk Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <button
        className="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Bulk Add
      </button>
    </>
  );
}
