class Comment {
  constructor (comment) {
    Object.keys(comment).forEach(prop => {
      this[prop] = comment[prop];
    });
  }
}

module.exports = Comment;
