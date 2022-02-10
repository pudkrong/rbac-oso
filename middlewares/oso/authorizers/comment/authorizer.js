const Comment = require('./model');
const Base = require('../base');
const _ = require('lodash');

class Authorizer extends Base {
  constructor () {
    super([Comment], `${__dirname}/comment.polar`);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getResource (ctx) {
    ctx.logger.debug('Get resource', ctx.params);
    const data = await ctx.call('v3.comment._getByPublicId', { commentId: ctx.params.commentId });
    ctx.logger.debug('Resource data', data);
    ctx.resources = { comment: data };
    return new Comment(data);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getExtraPermissions (actor, ctx) {
    const comment = _.get(ctx, 'resources.comment', null);
    if (comment && (comment.referenceType === 'post')) {
      ctx.logger.debug('Get extra permissions', ctx.params);
      const post = await ctx.call('v3.post._getByPrivateId', { postId: comment.referenceId });
      if (_.get(post, 'targetType', null) === 'community') {
        const community = await ctx.call('v3.community._getByPrivateId', { communityId: post.targetId });
        const permissions = await ctx.call('v3.community._getCommunityUserPermissions', { communityId: community.communityId, userId: ctx.meta.userId });
        ctx.logger.debug('permissions data', permissions);
        actor.setExtraUserPermissions(permissions);
      }
    }
  }
}

module.exports = new Authorizer();
