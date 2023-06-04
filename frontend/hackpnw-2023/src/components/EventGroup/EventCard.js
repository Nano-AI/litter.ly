import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import Logo from '../../img/logo.png';

import { SeverityScale } from "./SeverityEmoji";
import { useTheme } from '@emotion/react';
import EventDetails from '../EventDetails/EventDetails';
import { Tooltip } from '@mui/material';
import Link from '@mui/material/Link';

import * as Database from "../../api/Database";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

export default function EventCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    navigator.clipboard.writeText(window.location.href + "id/" + id);
    setOpen(true);
  };

  var title = defaultVal(props.title, "Puget Sound Litter");
  var description = defaultVal(props.description, "No description").replaceAll("+", " ");
  var severity = clamp(4 - (defaultVal(props.severity, 2) - 1));
  var time = timeSince(Date.parse(defaultVal(props.time, new Date())));
  var location = defaultVal(props.location, "None specified");
  var demand = defaultVal(props.demand, 0);
  let photo = defaultVal(props.photo, Logo);
  let tags = props.tags.length > 0 ? "#" + props.tags.replaceAll("+", "-").split(",").join(" #") : "No tags";
  let author = props.author;
  let id = props.id;

  const severityKey = SeverityScale.features[severity];
  const SeverityEmoji = severityKey.icon;

  return (
    <Grid item class="event-grid" style={{ width: "100%", maxWidth: "120vh" }}>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: "80%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500], flex: '1 0 auto' }} aria-label="recipe">
                {author.charAt(0)}
              </Avatar>
            }
            action={
              <Tooltip title="Relative scale of how bad it affects people." arrow>
                <IconButton aria-label="settings">
                  <SeverityEmoji
                    style={{ color: severityKey.color, fontSize: "3rem" }} />
                </IconButton>
              </Tooltip>
            }
            title={title}
            subheader={
              <>
                <CardActions className="card-location">
                  <PlaceIcon style={{ fontSize: "1rem" }} /> {location}
                  <AccessTimeOutlinedIcon style={{ fontSize: "1rem" }} />
                  {time} ago
                </CardActions>
              </>
            }
            titleTypographyProps={{ variant: 'h5' }}
            subheaderTypographyProps={{ variant: 'body2' }}
          />
          <CardContent>
            <Typography variant="body1" color="text.primary">
              {
                (description.length <= 400) ? description : (<>
                  {description.substring(0, 397)}...
                  <Typography color="info.main">(Click on sign up button for more)</Typography>
                </>)
              }
            </Typography>
            <Typography variant="body1" color="info.main">
              <b>{tags}</b>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            </Box>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>

              <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Copied to Clipboard!"
                >
                  <Button onClick={handleTooltipOpen}>
                    <ShareIcon />
                  </Button>
                </Tooltip>
              </ClickAwayListener>


              <ExpandMore
                expand={expanded}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <EventDetails
                  description={description}
                  title={title}
                  time={time}
                  location={location}
                  tags={tags}
                  photo={photo}
                  expand={expanded}
                />
              </ExpandMore>
            </CardActions>
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: "20%" }}
          image={photo}
          className="card-media-image"
        // alt="Live from space album cover"
        />
      </Card>
    </Grid>
  );
}