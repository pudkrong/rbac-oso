'use strict';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
const _ = require('lodash');
const Repo = require('../lib/repository');

module.exports = {
  name: 'comment',
  version: 3,

  async started () {
    this.repo = new Repo();
  },

  /**
   * Actions
   */
  actions: {
    _getByPublicId: {
      async handler (ctx) {
        this.logger.debug(`Getting comment for: ${ctx.params.commentId}`);
        const data = await this.repo.Comment.findOne({ commentId: ctx.params.commentId });
        return data;
      }
    }
  }
};
