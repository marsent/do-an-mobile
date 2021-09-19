function createCode() {
  let currentTime = new Date().getTime() % 1000000000;
  return currentTime.toString(35).toUpperCase();
}

export default createCode;
