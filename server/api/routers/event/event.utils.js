function getRandomPin(chars, len) {
  return [...Array(len)]
    .map((i) => chars[Math.floor(Math.random() * chars.length)])
    .join('');
}

function getRandomAttendCode() {
  return getRandomPin('0123456789', 4);
}

function getEndtime(start, duration){
  if(start && duration)  return new Date(new Date(start).getTime() + Number(duration) * 60000);
  else if(start)  return new Date(new Date(start).getTime() + 60 * 60000);
  else return new Date(new Date() + 60 * 60000);
}

module.exports = {
  getRandomPin,
  getRandomAttendCode,
  getEndtime
};
