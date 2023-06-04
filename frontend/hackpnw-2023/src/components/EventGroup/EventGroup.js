import CardGroup from 'react-bootstrap/CardGroup';
import EventCard from './EventCard';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import "./EventGroup.css";


function EventCardHolder() {

  const [state, setState] = React.useState({ data: null });

  let url = "https://37e7-63-208-141-34.ngrok-free.app/";

  // const xhr = new XMLHttpRequest();
  // const post = url + "getentries/partOfDB=true";
  // xhr.open("GET", post);
  // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  // xhr.send();
  // console.log(xhr.response);
  const options = {
    method: 'GET',    
    withCredentials: true,    
    crossorigin: true,  
    headers: new Headers({'content-type': 'application/json'}),
    mode: 'no-cors'
  };
  
  // if (data == null {
  //  fetch(url + "getentries/partOfDB=true", options)
  //    .then(r => {console.log(r); r.json()})
  //    .then(data => {
  //      console.log("Data", data)
  //        setState({ data: data });
  //    }).catch(e => {console.log(e)});
  //   }
  console.log(state.data);

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
        <EventCard tags="#survivng #jkwerealldyingofpollution" author="test" title="Testing" description="Testingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
      </Grid>
    </Container>
    </div>
  );
}

export default EventCardHolder;