const Community = require('./model');
const Base = require('../base');

class Authorizer extends Base {
  constructor () {
    super([Community], `${__dirname}/community.polar`);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getResource (ctx) {
    ctx.logger.debug('Get resource', ctx.params);
    const data = await ctx.call('v3.community._getByPublicId', { communityId: ctx.params.communityId });
    ctx.logger.debug('Resource data', data);
    return new Community(data);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getExtraPermissions (actor, ctx) {
    ctx.logger.debug('Get extra permissions', ctx.params);
    const permissions = await ctx.call('v3.community._getCommunityUserPermissions', { communityId: ctx.params.communityId, userId: ctx.meta.userId });
    ctx.logger.debug('permissions data', permissions);
    actor.setExtraUserPermissions(permissions);
  }
}

module.exports = new Authorizer();
