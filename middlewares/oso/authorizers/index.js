module.exports = {
  channel: require('./channel/authorizer'),
  user: require('./user/authorizer'),
  community: require('./community/authorizer'),
  post: require('./post/authorizer'),
  comment: require('./comment/authorizer'),
  message: require('./message/authorizer')
};
