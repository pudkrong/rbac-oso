class Community {
  constructor (community) {
    Object.keys(community).forEach(prop => {
      this[prop] = community[prop];
    });
  }
}

module.exports = Community;
