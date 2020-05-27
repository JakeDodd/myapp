import React from "react";
import NavBar from "./NavBar";
import ImageSearch from "./ImageSearch";
import SteamButton from "./SteamButton";

const App = () => (
  <div className="ui container">
    <NavBar />
    <ImageSearch />
    <SteamButton
      onClick={async () => {
        // window.location='https://localhost:3002/auth/steam'

        try {
          // const response = await fetch("/api");
          // const bodyText = await response.text();
          // console.log(bodyText);
          // alert("Response: " + bodyText);
          // fetch("/api/auth/steam");
          window.location = "/api/auth/steam";
        } catch (err) {
          console.error("this failed", err);
        }

        // fetch("/api").then((response) => {
        //   response
        //     .json()
        //     .then((body) => {
        //       console.log(body);
        //     })
        //     .catch((err) => {
        //       console.error("this failed!", err);
        //     });
        // });
      }}
      type="image"
      buttonStyle="steamImg"
    />
  </div>
);

export default App;

// function test(value, callback) {
//   // do something
//   const newValue = value + 1;
//   const user = databasefindrow...();
//   callback(user)
//   // callback(newValue)
//   // return newValue
// }

// const a = doThingA();
// const b = doThingB(function(data) {
// // data
// }); // get user from facebook.com -> 300ms -> data
// const c = doThingC();

// function instant(value) {
//   return "instant" + value;
// }

// function notInstant(value) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve("not instant" + value);
//     }, 2500);
//   });
// }

// async function go() {
//   const a = instant(1);
//   const b = a + (await notInstant(2));
//   const c = b + (await notInstant(3));
//   console.log(c);
//   // notInstant(2).then(function (newValue) {
//   //   const b = a + newValue;
//   //   console.log(b);

//   //   notInstant(3).then(function (newValue2) {
//   //     const c = b + newValue2;
//   //     console.log(c);
//   //   });
//   // });
// }
// // const b = a + notInstant(2);
// // console.log(b);
// // const c = b + instant(3);
// // console.log(c);

// go();
