'use strict';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
const _ = require('lodash');
const Repo = require('../lib/repository');

module.exports = {
  name: 'channel',
  version: 3,

  async started () {
    this.repo = new Repo();
  },

  /**
   * Actions
   */
  actions: {
    _getChannelUserPermissions: {
      async handler (ctx) {
        this.logger.debug(`Getting channel user permission for channel: ${ctx.params.channelId}, user: ${ctx.params.userId}`);
        const data = await this.repo.ChannelUser.findOne({
          userId: ctx.params.userId,
          channelId: ctx.params.channelId
        });
        return data ? data.permissions : [];
      }
    },

    _getByPublicId: {
      async handler (ctx) {
        this.logger.debug(`Call _getByPublicId for ${ctx.params.channeId}`);
        const data = await this.repo.Channel.findOne({ channelId: ctx.params.channeId });
        return data;
      }
    }
  }
};
