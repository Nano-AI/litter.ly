import EventCard from './EventCard';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import "./EventGroup.css";

import * as Database from "../../api/Database";

function EventCardHolder() {

  const [state, setState] = React.useState({ data: null });

  if (!state.data) {
    Database.getAllEntries("partOfDB=true", (data) => {
      setState({ data: JSON.parse(data.response) });
    })
  }

  return (
    <div>
      <Container>
        <Grid
          container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {state.data ? state.data.map((e) => {
            console.log("TSTEST")
            console.log(e)
            return (
              <EventCard
                severity={e['severity']}
                tags={e['tags']}
                photo={e['photo-url']}
                title={e['title']}
                description={e['description']}
                time={e['date-reported']}
                location={e['location']}
                demand={e['demand']}
                author={e['author']}
                id={e['___id']}
              />
            );
          }) : <></>}
        </Grid>
      </Container>
    </div>
  );
}

export default EventCardHolder;