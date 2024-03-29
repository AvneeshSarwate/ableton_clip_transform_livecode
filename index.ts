const INPUT_PORT = 5335
const OUTPUT_PORT = 5336


import { UDPPort } from 'osc';
import { Context, Note } from './AbletonClip';

// Create an osc.js UDP Port listening on port 57121.
var udpPort = new UDPPort({
  localAddress: "127.0.0.1",
  localPort: INPUT_PORT,
  metadata: true
});

function sendNotes(notes: Note[]) {
  const newNotes = JSON.stringify({ notes })
  udpPort.send({
    address: "/newNotes",
    args: [{type: "s", value: newNotes}]
  }, "127.0.0.1", OUTPUT_PORT)
}

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
  const clipData = JSON.parse(oscMsg.args[0].value)
  const context: Context = { clip: clipData.clip, scale: clipData.scale, grid: clipData.grid }
  const inputNotes: Note[] = clipData.notes

  const outputNotes = transposeNotes(inputNotes, -5)

  sendNotes(outputNotes)
})

// Open the socket.
udpPort.open();



function transposeNotes(inputNotes: Note[], amount: number) {
  const notes = inputNotes.map(note => new Note(note))
  notes.forEach(note => {
    note.pitch += amount
  })
  return notes
}
