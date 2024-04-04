const INPUT_PORT = 5335
const OUTPUT_PORT = 5337


import { UDPPort } from 'osc';
import { Context, OutputNote, InputNote } from './AbletonClip';

// Create an osc.js UDP Port listening on port 57121.
var udpPort = new UDPPort({
  localAddress: "127.0.0.1",
  localPort: INPUT_PORT,
  metadata: true
});

function sendNotes(notes: InputNote[]) {
  const outputNotes = notes.map(note => new OutputNote(note))
  const newNotes = JSON.stringify({ notes: outputNotes })
  udpPort.send({
    address: "/newNotes",
    args: [{type: "s", value: newNotes}]
  }, "127.0.0.1", OUTPUT_PORT)
}

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
  try {
    const clipData = JSON.parse(oscMsg.args[0].value)
    const context: Context = { clip: clipData.clip, scale: clipData.scale, grid: clipData.grid }
    const inputNotes: InputNote[] = clipData.notes
    const selectedNotes: InputNote[] = clipData.selectedNotes
    const funcName: string = clipData.funcName
    
    let outputNotes: InputNote[] = []
    switch (funcName) {
      case "func1":
        outputNotes = transposeSelectedNotesUpOctave(inputNotes, selectedNotes)
        break
      case "func2":
        outputNotes = transposeSelectedNotesDownOctave(inputNotes, selectedNotes)
        break
    }

    console.log("outputNotes", outputNotes)

    sendNotes(outputNotes)
  } catch (e) {
    console.error(e)
  }
})

// Open the socket.
udpPort.open();



function transposeNotes(inputNotes: InputNote[], amount: number): InputNote[] {
  const notes: InputNote[] = inputNotes.map(note => ({...note}))
  notes.forEach(note => {
    note.pitch += amount
  })
  return notes
}

function transposeSelectedNotesUpOctave(inputNotes: InputNote[], selectedNotes: InputNote[]): InputNote[] {
  const selectedNoteIds = selectedNotes.map(note => note.note_id)
  const nonSelectedNotes = inputNotes.filter(note => !selectedNoteIds.includes(note.note_id))

  const transposedSelectedNotes = transposeNotes(selectedNotes, 12)
  return [...nonSelectedNotes, ...transposedSelectedNotes]
}

function transposeSelectedNotesDownOctave(inputNotes: InputNote[], selectedNotes: InputNote[]): InputNote[] {
  const selectedNoteIds = selectedNotes.map(note => note.note_id)
  const nonSelectedNotes = inputNotes.filter(note => !selectedNoteIds.includes(note.note_id))

  const transposedSelectedNotes = transposeNotes(selectedNotes, -12)
  return [...nonSelectedNotes, ...transposedSelectedNotes]
}

