export const removeNumericKey = (object) => {
  let obj = { ...object };
  for (let key in obj) {
    if (!Number.isNaN(+key)) {
      delete obj[key];
    }
  }
  return obj;
};

export const timeLeft = (date) => {
  if (!date) return null;
  const seconds = Math.floor((+date * 1000 - Date.now()) / 1000);
  if (seconds < 0) return "End time";
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
