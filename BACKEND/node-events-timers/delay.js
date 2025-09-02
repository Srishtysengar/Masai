function delayMessage(message, time) {
  return new Promise((resolve, reject) => {
    if (!message || isNaN(time)) {
      return reject(new Error("Invalid message or time"));
    }

    setTimeout(() => {
      resolve({ message, delay: `${time}ms` });
    }, parseInt(time));
  });
}

module.exports = delayMessage;
