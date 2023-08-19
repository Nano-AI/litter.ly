<<<<<<< HEAD
function cookiePrompt() {
  return prompt("Please enter Leaflet server URL: ", "");
}

function getCookie() {
  if (document.cookie == "") {
    return {};
  }
  return JSON.parse(document.cookie);
}

function setCookie() {
  let cookie = getCookie();
  let serverUrl = cookiePrompt();
  cookie["serverUrl"] = serverUrl;
  document.cookie = JSON.stringify(cookie);
}

function updateCookie(check) {
  let cookie = getCookie();
  if (cookie["serverUrl"] == undefined) {
    setCookie();
  }
  let serverUrl = cookie["serverUrl"];
  if (serverUrl === null || serverUrl === "") {
=======
let serverUrl = prompt("Please enter Leaflet server URL: ", "https://litter-ly.onrender.com");
if (serverUrl === null || serverUrl === "") {
>>>>>>> d590e70c1a39c80c1a48048c901f81b1f5365ae9
    alert("Website won't work properly without a server URL.");
  }
  return serverUrl;
}

var serverUrl = updateCookie();
console.log(serverUrl);

const ngrokUrl = serverUrl;
const safeUrl = serverUrl.replaceAll("/", "-");;
// const url = 'https://';

export function pingDatabase(queryFlags, onReady) {
  // let reqUrl = encodeURIComponent(`${ngrokUrl}/${queryFlags}`);
  let reqUrl = `${ngrokUrl}/${queryFlags}`;
  console.log(reqUrl);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log(this)
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(onReady);
        onReady(xhttp);
      }
      else {
        console.log("updoate")
        setCookie();
      }
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
