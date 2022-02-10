class UserResource {
  constructor (user) {
    Object.keys(user).forEach(prop => {
      this[prop] = user[prop];
    });
  }
}

module.exports = UserResource;
