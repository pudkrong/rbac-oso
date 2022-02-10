const Channel = require('./model');
const Base = require('../base');

class Authorizer extends Base {
  constructor () {
    super([Channel], `${__dirname}/channel.polar`);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getResource (ctx) {
    ctx.logger.debug('Get resource', ctx.params);
    const data = await ctx.call('v3.channel._getByPublicId', { channeId: ctx.params.channelId });
    ctx.logger.debug('Resource data', data);
    ctx.resources = { channel: data };
    return new Channel(data);
  }

  // TODO::PUD Might be interface that dev has to specific
  async getExtraPermissions (actor, ctx) {
    ctx.logger.debug('Get extra permissions', ctx.params);
    const permissions = await ctx.call('v3.channel._getChannelUserPermissions', { channelId: ctx.params.channelId, userId: ctx.meta.userId });
    ctx.logger.debug('Extra permissions data', permissions);
    actor.setExtraUserPermissions(permissions);
  }
}

module.exports = new Authorizer();
