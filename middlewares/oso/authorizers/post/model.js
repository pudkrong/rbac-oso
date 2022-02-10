class Post {
  constructor (post) {
    Object.keys(post).forEach(prop => {
      this[prop] = post[prop];
    });
  }
}

module.exports = Post;
