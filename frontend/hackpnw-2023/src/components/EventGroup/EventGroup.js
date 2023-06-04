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

  let url = "https://95f7-216-9-29-203.ngrok-free.app/";

  // const xhr = new XMLHttpRequest();
  // const post = url + "getentries/partOfDB=true";
  // xhr.open("GET", post);
  // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  // xhr.send();
  // console.log(xhr.response);
  const options = {
    method: 'GET',    
    withCredentials: true, 
    crossorigin: false,  
    headers: new Headers({'content-type': 'text/html'}),
  };
  
  if (state.data == null) {
   fetch(url + "getentries/partOfDB=true", options)
     .then(r => {console.log(r); r.json()})
     .then(data => {
       console.log("Data", data)
         setState({ data: data });
     }).catch(e => {console.log(e)});
    }
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
        <EventCard location="aAronlaod's house" photo="https://nypost.com/wp-content/uploads/sites/2/2018/08/trashing-trash.jpg?quality=75&strip=all" severity={1} tags="#survivng #jkwerealldyingofpollution" author="test" title="Testing" description="aaslk;dfj askl;djf a;slkdjf as;lkdfjasd;lkfj as;lkfj asdl;kdfj as;lkdfj as;lkfj as;lkdfj as;lkdfj;jlkasdjf al;ksdjfkl;asd fjask;lfj aaslkd;fj as;lkd fjaslk;ds;kldfj fl asl;kdfjasl;kd fjas;lkdfj asl;kdfj asl;kdfj asl;kdfj asl;kdfj as;lkfj a;lks j sdf;askdjfasl;kdfjas;lkdfj askl;dfj asl;kdfj asl;kd jalks;fj asl;kfj alk;sdjf asl;kdfja;lsdfjasl;kdfj a;slkfj as;lkfj as;lkjf a;klsTestingasdf asdfasdfasdfasdfasd" time="July 1st, 2023, 5am" />
      </Grid>
    </Container>
    </div>
  );
}

export default EventCardHolder;