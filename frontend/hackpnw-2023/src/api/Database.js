const ngrokUrl = "https://49a4-216-9-29-196.ngrok-free.app";
const safeUrl = "https:--49a4-216-9-29-196.ngrok-free.app";
const url = 'https://corsproxy.io/?';

export function pingDatabase(queryFlags, onReady) {
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
