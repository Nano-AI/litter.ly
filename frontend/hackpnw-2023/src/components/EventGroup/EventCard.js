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
import { red } from '@mui/material/colors';
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

export default function EventCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var title = props.title;
  var description = props.description;
  var severity = props.severity;
  var time = props.time;
  var location = props.location;
  var demand = props.demand;
  let photo = props.photo;
  let tags = props.tags;
  let author = props.author;

  return (
    <Grid item class="event-grid" style={{ width: "100%" }} /*xs={12} sm={6} md={8}*/>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: "80%" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500], flex: '1 0 auto' }} aria-label="recipe">
                {author.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={title}
            subheader={time}
            titleTypographyProps={{variant:'h5' }} 
            subheaderTypographyProps={{variant: 'body1'}}
          />
          <CardContent>
            <Typography variant="body1" color="text.primary">
              {description}
            </Typography>
            <Typography variant="body1" color="info.main">
              {tags}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <CardActions>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                onClick={() => { alert("HELPPPP") }}
              >
                <AppRegistrationIcon />
              </ExpandMore>
            </CardActions>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: "20%" }}
          image="https://nypost.com/wp-content/uploads/sites/2/2018/08/trashing-trash.jpg?quality=75&strip=all"
          alt="Live from space album cover"
        />
      </Card>
    </Grid>
  );
}