import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardActions, CardMedia, IconButton, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import Logo from '../../img/logo.png';
import * as Database from "../../api/Database";

import "./EventDetails.css";
import SignupDetails from './SignupDetails';
import { useParams } from 'react-router';

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

function defaultVal(p1, def) {
  if (!p1) {
    return def;
  }
  return p1;
}

function clamp(val, min, max) {
  if (val > max)
    return max;
  else if (val < min)
    return min;
  return val;
}

export default function EventDetails(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [data, setData] = React.useState({
    description: null,
    title: null,
    time: new Date(),
    location: null,
    tags: null,
    photo: null
  });

  var id = useParams()['id'];

  if (!data.title) {
    if (id) {
      Database.getAllEntries("___id=" + id, (d) => {
        let data = JSON.parse(d.response)[0];
        var title = defaultVal(data.title, "Puget Sound Litter");
        var description = defaultVal(data.description, "No description").replaceAll("+", " ");
        var severity = clamp(4 - (defaultVal(data.severity, 2) - 1));
        var time = timeSince(Date.parse(defaultVal(data.time, new Date())));
        var location = defaultVal(data.location, "None specified");
        var demand = defaultVal(data.demand, 0);
        let photo = defaultVal(data.photo, Logo);
        let tags = data.tags.length > 0 ? "#" + data.tags.replaceAll("+", "-").split(",").join(" #") : "No tags";
        let author = data.author;
        
        setOpen(true);
        setData({
          description: description,
          title: title,
          time: time,
          location: location,
          tags: tags,
          photo: photo
        });
      });
    } else {
      setData({
        description: props.description,
        title: props.title,
        time: props.time,
        location: props.location,
        tags: props.tags,
        photo: props.photo
      });
    }
  }

  if (props.expanded) {
    setOpen(true);
    setScroll("paper");
  }

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

  var title = data.title;
  var time = data.time;
  var location = data.location;
  var tags = data.tags;
  var description = data.description;
  var photo = data.photo;

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
            {/* <CardMedia
              component="img"
              sx={{ width: "20%" }}
              image={photo}
              className="detail-image" /> */}

            <Typography variant="h3" color="text.primary">
              {title}
            </Typography>

            <CardActions className="card-location">
              <PlaceIcon style={{ fontSize: "1rem" }} /> {location}
              <AccessTimeOutlinedIcon style={{ fontSize: "1rem" }} />
              {time} ago
            </CardActions>
            <Typography variant="body1" color="info.main">
              <b>{tags}</b>
            </Typography>
            <Typography variant="body1" color="text.primary">
              {description}
            </Typography>

            <SignupDetails id="lmaooo" background={photo} style={{ backgroundImage: `url(${photo})`, width: "100%" }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}