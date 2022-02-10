const Message = require('./model');
const Base = require('../base');
const _ = require('lodash');

class Authorizer extends Base {
  constructor () {
    super([Message], `${__dirname}/message.polar`);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getResource (ctx) {
    ctx.logger.debug('Get resource', ctx.params);
    const data = await ctx.call('v3.message._getByPublicIds', { messageId: ctx.params.messageId });
    ctx.logger.debug('Resource data', data);
    ctx.resources = { message: data };
    return new Message(data);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getExtraPermissions (actor, ctx) {
    const message = _.get(ctx, 'resources.message', null);
    if (message && message.channelId) {
      ctx.logger.debug('Get extra permissions', ctx.params);
      const permissions = await ctx.call('v3.channel._getChannelUserPermissions', { channelId: message.channelId, userId: ctx.meta.userId });
      ctx.logger.debug('permissions data', permissions);
      actor.setExtraUserPermissions(permissions);
    }
  }
}

module.exports = new Authorizer();
