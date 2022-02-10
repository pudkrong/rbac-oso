const Post = require('./model');
const Base = require('../base');
const _ = require('lodash');

class Authorizer extends Base {
  constructor () {
    super([Post], `${__dirname}/post.polar`);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getResource (ctx) {
    ctx.logger.debug('Get resource', ctx.params);
    const data = await ctx.call('v3.post._getByPublicId', { postId: ctx.params.postId });
    ctx.logger.debug('Resource data', data);
    ctx.resources = { post: data };
    return new Post(data);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getExtraPermissions (actor, ctx) {
    const post = _.get(ctx, 'resources.post', null);
    if (post && (post.targetType === 'community')) {
      ctx.logger.debug('Get extra permissions', ctx.params);
      const permissions = await ctx.call('v3.community._getCommunityUserPermissions', { communityId: post.targetId, userId: ctx.meta.userId });
      ctx.logger.debug('permissions data', permissions);
      actor.setExtraUserPermissions(permissions);
    }
  }
}

module.exports = new Authorizer();
