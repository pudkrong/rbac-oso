const UserResource = require('./model');
const Base = require('../base');

class Authorizer extends Base {
  constructor () {
    super([UserResource], `${__dirname}/user.polar`);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getResource (ctx) {
    ctx.logger.debug('Get resource', ctx.params);
    const data = await ctx.call('v3.user._getUserByPublicId', { userId: ctx.params.userId });
    ctx.logger.debug('Resource data', data);
    return new UserResource(data);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getExtraPermissions (actor, ctx) {
  }
}

module.exports = new Authorizer();
