// import { Client, Message, Server } from 'node-osc';

// const client = new Client('127.0.0.1', 5336);




// const oscServer = new Server(5335, '127.0.0.1', () => {
//   console.log("oscServer is running")
// });

// oscServer.on('message', function (msg) {
//   console.log("oscMessage", msg)

//   const outMsg = new Message('/newNotes');
  
//   client.send(outMsg, (err) => {
//     if (err) {
//       console.error(new Error(err.message));
//     }
//   });
// });


import { UDPPort } from 'osc';

// Create an osc.js UDP Port listening on port 57121.
var udpPort = new UDPPort({
  localAddress: "127.0.0.1",
  localPort: 5335,
  metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
  console.log("An OSC message just arrived!", oscMsg);
  console.log("Remote info is: ", info);
});

// Open the socket.
udpPort.open();


// When the port is read, send an OSC message to, say, SuperCollider
// udpPort.on("ready", function () {
//   udpPort.send({
//       address: "/s_new",
//       args: [
//           {
//               type: "s",
//               value: "default"
//           },
//           {
//               type: "i",
//               value: 100
//           }
//       ]
//   }, "127.0.0.1", 57110);
// });