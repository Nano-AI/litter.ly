import CardGroup from 'react-bootstrap/CardGroup';
import EventCard from './EventCard';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import "./EventGroup.css";

const ngrokUrl = "https://49a4-216-9-29-196.ngrok-free.app";
const safeUrl = "https:--49a4-216-9-29-196.ngrok-free.app";
const url = 'https://corsproxy.io/?';

function pingDatabase(queryFlags, onReady) {
  let reqUrl = url + encodeURIComponent(`${ngrokUrl}/${queryFlags}`);
  console.log(reqUrl);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("RAAA")
      console.log(onReady)
      onReady(xhttp);
      // return xhttp.responseText;
    }
  };
  xhttp.open("GET", reqUrl, true);
  xhttp.setRequestHeader("ngrok-skip-browser-warning", "true");
  xhttp.send();
}

function getAllEntries(queryFlags, onReady) {
  return pingDatabase(`getentries/${queryFlags}`, onReady);
}

function insertEntry(queryFlags, onReady) {
  return pingDatabase(`insertdb/${queryFlags}`, onReady);
}

function selectEntries(queryKey, querySelection, onReady) {
  return pingDatabase(`selectdb/${queryKey}/${querySelection}`, onReady);
}

function updateEntries(updateQuery, querySelection, onReady) {
  return pingDatabase(`updatedb/${updateQuery}/${querySelection}`, onReady);
}

function EventCardHolder() {

  const [state, setState] = React.useState({ data: null });

  if (!state.data) {
    getAllEntries("partOfDB=true", (data) => {
      setState({ data: JSON.parse(data.response) });
    })
  }

  return (
    <div>
      <Container>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
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
              />
            );
          }) : <></>}
        </Grid>
      </Container>
    </div>
  );
}

export default EventCardHolder;