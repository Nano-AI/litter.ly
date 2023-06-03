import CardGroup from 'react-bootstrap/CardGroup';
import EventCard from './EventCard';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import "./EventGroup.css";


function EventCardHolder() {
  return (
    <div>
    <Container>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        /*id="event-grid"*/
      >
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
        <EventCard title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
      </Grid>
    </Container>
    </div>
  );
}

export default EventCardHolder;