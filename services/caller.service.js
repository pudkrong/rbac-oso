'use strict';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */
const _ = require('lodash');
const Repo = require('../lib/repository');

module.exports = {
  name: 'caller',

  async started () {
    this.repo = new Repo();
    await this.repo.init();

    const [ admin, user ] = await Promise.all([
      this.repo.User.findOne({ userId: 'admin' }),
      this.repo.User.findOne({ userId: 'user' })
    ]);

    this.users = { admin, user };
  },

  /**
   * Actions
   */
  actions: {
    checkChannelAdmin: {
      async handler (ctx) {
        return ctx.call('test.secureChannel', { channelId: 'channel01' }, {
          meta: this.users.admin
        });
      }
    },

    checkChannelOwner: {
      async handler (ctx) {
        return ctx.call('test.secureChannelOwner', { channelId: 'channel01' }, {
          meta: this.users.user
        });
      }
    },

    checkChannelPermission: {
      async handler (ctx) {
        return ctx.call('test.secureChannel', { channelId: 'channel02' }, {
          meta: this.users.user
        });
      }
    },

    checkChannelPermissionFail: {
      async handler (ctx) {
        return ctx.call('test.secureChannelFail', { channelId: 'channel02' }, {
          meta: this.users.user
        });
      }
    },

    checkUserOwner: {
      async handler (ctx) {
        return ctx.call('test.secureUserOwner', { userId: this.users.user.userId }, {
          meta: this.users.user
        });
      }
    },

    checkCommunityAdmin: {
      async handler (ctx) {
        return ctx.call('test.secureCommunity', { communityId: 'community01' }, {
          meta: this.users.admin
        });
      }
    },

    checkCommunityOwner: {
      async handler (ctx) {
        return ctx.call('test.secureCommunityOwner', { communityId: 'community01' }, {
          meta: this.users.user
        });
      }
    },

    checkCommunityPermission: {
      async handler (ctx) {
        return ctx.call('test.secureCommunity', { communityId: 'community02' }, {
          meta: this.users.user
        });
      }
    },

    checkCommunityPermissionFail: {
      async handler (ctx) {
        return ctx.call('test.secureCommunityFail', { communityId: 'community02' }, {
          meta: this.users.user
        });
      }
    },

    checkPostAdmin: {
      async handler (ctx) {
        return ctx.call('test.securePost', { postId: 'post01' }, {
          meta: this.users.admin
        });
      }
    },

    checkPostOwner: {
      async handler (ctx) {
        return ctx.call('test.securePostOwner', { postId: 'post01' }, {
          meta: this.users.user
        });
      }
    },

    checkPostPermission: {
      async handler (ctx) {
        return ctx.call('test.securePost', { postId: 'post02' }, {
          meta: this.users.user
        });
      }
    },

    checkPostPermissionFail: {
      async handler (ctx) {
        return ctx.call('test.securePostFail', { postId: 'post02' }, {
          meta: this.users.user
        });
      }
    },

    checkCommentAdmin: {
      async handler (ctx) {
        return ctx.call('test.secureComment', { commentId: 'comment01' }, {
          meta: this.users.admin
        });
      }
    },

    checkCommentOwner: {
      async handler (ctx) {
        return ctx.call('test.secureCommentOwner', { commentId: 'comment01' }, {
          meta: this.users.user
        });
      }
    },

    checkCommentPermission: {
      async handler (ctx) {
        return ctx.call('test.secureComment', { commentId: 'comment02' }, {
          meta: this.users.user
        });
      }
    },

    checkCommentPermissionFail: {
      async handler (ctx) {
        return ctx.call('test.secureCommentFail', { commentId: 'comment02' }, {
          meta: this.users.user
        });
      }
    },

    checkMessageAdmin: {
      async handler (ctx) {
        return ctx.call('test.secureMessage', { messageId: 'message01' }, {
          meta: this.users.admin
        });
      }
    },

    checkMessageOwner: {
      async handler (ctx) {
        return ctx.call('test.secureMessageOwner', { messageId: 'message01' }, {
          meta: this.users.user
        });
      }
    },

    checkMessagePermission: {
      async handler (ctx) {
        return ctx.call('test.secureMessage', { messageId: 'message02' }, {
          meta: this.users.user
        });
      }
    },

    checkMessagePermissionFail: {
      async handler (ctx) {
        return ctx.call('test.secureMessageFail', { messageId: 'message02' }, {
          meta: this.users.user
        });
      }
    },

    checkNonPermission: {
      async handler (ctx) {
        return ctx.call('hello.insecure', {}, {
          meta: this.settings.user
        });
      }
    }
  }
};
