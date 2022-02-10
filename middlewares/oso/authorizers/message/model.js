class Message {
  constructor (message) {
    Object.keys(message).forEach(prop => {
      this[prop] = message[prop];
    });
  }
}

module.exports = Message;
