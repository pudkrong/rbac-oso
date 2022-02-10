'use strict';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
const _ = require('lodash');
const Repo = require('../lib/repository');

module.exports = {
  name: 'post',
  version: 3,

  async started () {
    this.repo = new Repo();
  },

  /**
   * Actions
   */
  actions: {
    _getCommunityUserPermissions: {
      async handler (ctx) {
        this.logger.debug(`Getting community user permission for community: ${ctx.params.communityId}, user: ${ctx.params.userId}`);
        const community = await this.repo.Community.findOne({ communityId: ctx.params.communityId });
        if (community) {
          const data = await this.repo.ChannelUser.findOne({ channelId: community.channelId, userId: ctx.params.userId });
          return data ? data.permissions : [];
        } else {
          return [];
        }
      }
    },

    _getByPublicId: {
      async handler (ctx) {
        this.logger.debug(`Getting post for: ${ctx.params.postId}`);
        const data = await this.repo.Post.findOne({ postId: ctx.params.postId });
        return data;
      }
    },

    _getByPrivateId: {
      async handler (ctx) {
        this.logger.debug(`Getting post for: ${ctx.params.postId}`);
        const data = await this.repo.Post.findOne({ postId: ctx.params.postId });
        return data;
      }
    }
  }
};
