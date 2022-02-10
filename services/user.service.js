'use strict';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
const _ = require('lodash');
const Repo = require('../lib/repository');

module.exports = {
  name: 'user',
  version: 3,

  async started () {
    this.repo = new Repo();
  },

  /**
   * Actions
   */
  actions: {
    _getUserPermissions: {
      async handler (ctx) {
        this.logger.debug(`Getting permission for user ${ctx.params.userId}`);
        const data = await this.repo.UserPermission.findOne({ userId: ctx.params.userId });
        return data ? data.permissions : [];
      }
    },

    _getUserByPublicId: {
      async handler (ctx) {
        this.logger.debug(`Getting user for user ${ctx.params.userId}`);
        const data = await this.repo.User.findOne({ userId: ctx.params.userId });
        return data;
      }
    }
  }
};
