import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardActions, IconButton, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


import "./EventDetails.css";

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export default function EventDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  
  var data = props;
  var description = props.description;
  var title = props.title;
  var time = props.time;
  var location = props.location;
  var tags = props.tags;

  return (
    <div>
      <IconButton onClick={handleClickOpen('paper')}>
        <AppRegistrationIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="popup-dialog"
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogTitle id="scroll-dialog-title">Sign Up</DialogTitle>
        <DialogContent 
        dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}

            tabIndex={-1}
          >
            <Typography variant="h3" color="text.primary">
              {title}
            </Typography>

            <CardActions className="card-location">
              <PlaceIcon style={{ fontSize: "1rem" }} /> {location} 
              <AccessTimeOutlinedIcon style={{ fontSize: "1rem" }}/>
               {time} ago
            </CardActions>
            <Typography variant="body1" color="text.primary">
              {description}
            </Typography>
            <Typography variant="body1" color="info.main">
              <b>{tags}</b>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}