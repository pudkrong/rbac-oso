class Channel {
  constructor (channel) {
    Object.keys(channel).forEach(prop => {
      this[prop] = channel[prop];
    });
  }
}

module.exports = Channel;
