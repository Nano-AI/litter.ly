let serverUrl = prompt("Please enter Leaflet server URL: ", "https://47b8-24-18-55-225.ngrok-free.app");
if (serverUrl === null || serverUrl === "") {
    alert("Website won't work properly without a server URL.");
} 
const ngrokUrl = serverUrl;
const safeUrl = serverUrl.replaceAll("/", "-");;
// const url = 'https://';

export function pingDatabase(queryFlags, onReady) {
  // let reqUrl = encodeURIComponent(`${ngrokUrl}/${queryFlags}`);
  let reqUrl = `${ngrokUrl}/${queryFlags}`;
  console.log(reqUrl);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log("RAAA")
      // console.log(xhttp.response)
      // console.log(onReady)
      onReady(xhttp);
      // return xhttp.responseText;
    }
  };
  xhttp.open("GET", reqUrl, true);
  xhttp.setRequestHeader("ngrok-skip-browser-warning", "true");
  xhttp.send();
}

export function getAllEntries(queryFlags, onReady) {
  return pingDatabase(`getentries/${queryFlags}`, onReady);
}

export function insertEntry(queryFlags, onReady) {
  return pingDatabase(`insertdb/${queryFlags}`, onReady);
}

export function selectEntries(queryKey, querySelection, onReady) {
  return pingDatabase(`selectdb/${queryKey}/${querySelection}`, onReady);
}

export function updateEntries(updateQuery, querySelection, onReady) {
  return pingDatabase(`updatedb/${updateQuery}/${querySelection}`, onReady);
}

export default {
  pingDatabase, getAllEntries, insertEntry, selectEntries, updateEntries
};
