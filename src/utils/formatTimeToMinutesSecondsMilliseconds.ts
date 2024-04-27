export function formatTimeToMinutesSecondsMilliseconds(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds - minutes * 60);
  const milliseconds = timeInSeconds - seconds;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${
    milliseconds.toFixed(2).split(".")[1]
  }`;
}
