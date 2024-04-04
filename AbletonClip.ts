export class OutputNote {
  pitch: number = 60
  start_time: number = 0
  duration: number = 1
  velocity: number = 100
  mute: boolean = false
  probability: number = 1
  velocity_deviation: number = 0
  release_velocity: number = 64

  constructor(inNote: InputNote) {
    this.pitch = inNote.pitch
    this.start_time = inNote.start_time
    this.duration = inNote.duration
    this.velocity = inNote.velocity
    this.mute = inNote.mute
    this.probability = inNote.probability
    this.velocity_deviation = inNote.velocity_deviation
    this.release_velocity = inNote.release_velocity
  }
}

export class InputNote extends OutputNote {
  note_id: number = 0;
}

export type Context ={
  clip: {
    time_selection_start: number
    time_selection_end: number
    first_note_start: number
    last_note_end: number
    lowest_pitch: number
    highest_pitch: number
  }
  scale: {
    scale_mode: number
    root_note: number
    scale_intervals: number[]
  }
  grid: {
    interval: number
    enabled: boolean
  }
}
