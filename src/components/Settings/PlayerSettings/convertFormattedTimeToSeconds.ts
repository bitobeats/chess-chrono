export function convertFormattedTimeToSeconds(formattedTime: string) {
  const [hours = "00", minutes = "00", seconds = "00"] = formattedTime.split(":");

  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
}
