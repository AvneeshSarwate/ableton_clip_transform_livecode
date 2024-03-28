export class Note {
  note_id: number = -1;
  pitch: number = 60;
  start_time: number = 0;
  duration: number = 1;
  velocity: number = 100;
  mute: boolean = false;
  probability: number = 1;
  velocity_deviation: number = 0;
  release_velocity: number = 64;

  constructor(data: Partial<Note>) {
    Object.assign(this, data);
  }
}

export type Context ={
  clip: {
    time_selection_start: number;
    time_selection_end: number;
    first_note_start: number;
    last_note_end: number;
    lowest_pitch: number;
    highest_pitch: number;
  }
  scale: {
    scale_mode: number;
    root_note: number;
    scale_intervals: number[];
  }
  grid: {
    interval: number;
    enabled: boolean;
  }
}
