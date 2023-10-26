function cookiePrompt() {
  return prompt("Please enter Leaflet server URL: ", "");
}

function getCookie() {
  let cookieRes;
  try {
    cookieRes = document.cookie.split(";").map(v => v .replace(/\s/g, "").split("="));
  }
  catch (e) {
    console.log(e);
    document.cookie = "";
    return [["serverUrl", ""]];
  }
  return cookieRes
}

function setCookie() {
  let cookie = getCookie();
  let serverUrl = cookiePrompt();
  let n = 0;
  cookie.forEach((v) => {
      if(v[0] === "serverUrl") {
        cookie[n][1] = serverUrl;
      }
      n++;
  })
  cookie["serverUrl"] = serverUrl;
  document.cookie = JSON.stringify(cookie);
}

function updateCookie(check) {
  let cookie = getCookie();
  if (cookie["serverUrl"] === undefined) {
    setCookie();
  }
  let serverUrl = cookie["serverUrl"];
  if (serverUrl === null || serverUrl === "") {
    alert("Website won't work properly without a server URL.");
  }
  return serverUrl;
}

var serverUrl = "https://litter-ly.onrender.com"; // FUCK YOU ADI
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
        //setCookie();
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
