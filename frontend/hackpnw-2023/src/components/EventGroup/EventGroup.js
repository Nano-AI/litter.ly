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

function pingDatabase (queryFlags) {
  let reqUrl = url + encodeURIComponent(`${ngrokUrl}/${queryFlags}`);
  console.log(reqUrl);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          return xhttp.responseText;
      }
  };
  xhttp.open("GET", reqUrl, true);
  xhttp.setRequestHeader("ngrok-skip-browser-warning", "true");
  xhttp.send();
}

function getAllEntries (queryFlags) {
  return pingDatabase(`getentries/${queryFlags}`);
}

function insertEntry (queryFlags) {
  return pingDatabase(`insertdb/${queryFlags}`);
}

function selectEntries (queryKey, querySelection) {
  return pingDatabase(`selectdb/${queryKey}/${querySelection}`);
}

function updateEntries (updateQuery, querySelection) {
  return pingDatabase(`updatedb/${updateQuery}/${querySelection}`);
}

function EventCardHolder() {

  const [state, setState] = React.useState({ data: null });

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