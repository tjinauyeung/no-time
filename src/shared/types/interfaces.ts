export interface Processes {
  [processName: string]: Process;
}

export interface Process {
  views: {
    [childProcessName: string]: number;
  };
  time: number;
}
