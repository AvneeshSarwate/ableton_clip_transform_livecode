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
import { Context, Note } from './AbletonClip';

// Create an osc.js UDP Port listening on port 57121.
var udpPort = new UDPPort({
  localAddress: "127.0.0.1",
  localPort: 5335,
  metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
  const clipData = JSON.parse(oscMsg.args[0].value)
  const context: Context = { clip: clipData.clip, scale: clipData.scale, grid: clipData.grid }
  const inputNotes: Note[] = clipData.notes
  console.log("inputNotes", inputNotes)
  const notes = inputNotes.map(note => new Note(note))
  notes.forEach(note => {
    note.pitch += 1
  })
  
  const newNotes = JSON.stringify({ notes })
  console.log("newNotes", newNotes)

  udpPort.send({
    address: "/newNotes",
    args: [{type: "s", value: newNotes}]
  }, "127.0.0.1", 5336)
})

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