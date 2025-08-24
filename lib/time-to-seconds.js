

// export function timeToSeconds(timeStr) {
//   const parts = timeStr.split(":").map(Number);

//   let hours = 0, minutes = 0, seconds = 0;

//   if (parts.length === 3) {
//     [hours, minutes, seconds] = parts;
//   } else if (parts.length === 2) {
//     [minutes, seconds] = parts;
//   } else if (parts.length === 1) {
//     [seconds] = parts;
//   }

//   return hours * 3600 + minutes * 60 + seconds;
// }

export function timeToSeconds(timeStr) {
  const parts = timeStr.split(":").map(Number);

  if (parts.some(isNaN)) {
    throw new Error("Invalid time format");
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  } else {
    throw new Error("Invalid time format, use HH:MM:SS or MM:SS");
  }
}

// export function secondsToTime(totalSeconds) {
//   if (isNaN(totalSeconds) || totalSeconds < 0) {
//     throw new Error("Invalid seconds");
//   }

//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   // Pad with leading zeros
//   const hh = String(hours).padStart(2, "0");
//   const mm = String(minutes).padStart(2, "0");
//   const ss = String(seconds).padStart(2, "0");

//   return `${hh}:${mm}:${ss}`;
// }

// export function secondsToTime(totalSeconds) {
//   // Ensure it's a number and not negative
//   if (typeof totalSeconds !== "number" || isNaN(totalSeconds) || totalSeconds < 0) {
//     throw new Error("Invalid seconds");
//   }

//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   // Pad with leading zeros
//   const hh = String(hours).padStart(2, "0");
//   const mm = String(minutes).padStart(2, "0");
//   const ss = String(seconds).padStart(2, "0");

//   return `${hh}:${mm}:${ss}`;
// }

export function secondsToTime(totalSeconds) {
  // Convert to number if it's a string
  // const sec = Number(totalSeconds);

  // if (isNaN(sec) || sec < 0) {
  //   throw new Error("Invalid seconds from query");
  // }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Pad with leading zeros
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${hh}:${mm}:${ss}`;
}