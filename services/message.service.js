'use strict';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
const _ = require('lodash');
const Repo = require('../lib/repository');

module.exports = {
  name: 'message',
  version: 3,

  async started () {
    this.repo = new Repo();
  },

  /**
   * Actions
   */
  actions: {
    _getByPublicIds: {
      async handler (ctx) {
        this.logger.debug(`Getting message for: ${ctx.params.messageId}`);
        const data = await this.repo.Message.findOne({ messageId: ctx.params.messageId });
        return data;
      }
    }
  }
};
