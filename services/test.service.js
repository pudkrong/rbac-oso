'use strict';

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const Permissions = require('../middlewares/oso/permissions/index');

module.exports = {
  name: 'test',

  /**
   * Actions
   */
  actions: {
    secureChannel: {
      permissions: {
        resourceType: 'channel',
        action: [Permissions.ChannelV3.AddChannelUser, Permissions.ChannelV3.EditChannel]
      },
      async handler (ctx) {
        // Check whether user is banned in the channel
        this.logger.info('Say hello', ctx.resources.channel);

        return true;
      }
    },

    secureChannelFail: {
      permissions: {
        resourceType: 'channel',
        action: Permissions.ChannelV3.AddChannelUser
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureChannelOwner: {
      permissions: {
        resourceType: 'channel',
        action: Permissions.ChannelV3.EditChannel
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureUserOwner: {
      permissions: {
        resourceType: 'user',
        action: Permissions.UserV3.EditUser
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureCommunity: {
      permissions: {
        resourceType: 'community',
        action: Permissions.CommunityV3.AddCommunityUser
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureCommunityFail: {
      permissions: {
        resourceType: 'community',
        action: Permissions.CommunityV3.DeleteCommunity
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureCommunityOwner: {
      permissions: {
        resourceType: 'community',
        action: Permissions.CommunityV3.AddCommunityUser
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    securePost: {
      permissions: {
        resourceType: 'post',
        action: Permissions.CommunityV3.EditCommunityPost
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    securePostFail: {
      permissions: {
        resourceType: 'post',
        action: Permissions.CommunityV3.ReviewCommunityPost
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    securePostOwner: {
      permissions: {
        resourceType: 'post',
        action: Permissions.CommunityV3.ReviewCommunityPost
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureComment: {
      permissions: {
        resourceType: 'comment',
        action: Permissions.CommunityV3.DeleteCommunityComment
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureCommentFail: {
      permissions: {
        resourceType: 'comment',
        action: Permissions.UserFeed.DeleteUserFeedComment
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureCommentOwner: {
      permissions: {
        resourceType: 'comment',
        action: Permissions.CommunityV3.EditCommunityComment
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureMessage: {
      permissions: {
        resourceType: 'message',
        action: Permissions.ChannelV3.EditMessage
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureMessageFail: {
      permissions: {
        resourceType: 'message',
        action: Permissions.ChannelV3.DeleteMessage
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    secureMessageOwner: {
      permissions: {
        resourceType: 'message',
        action: Permissions.ChannelV3.EditMessage
      },
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    },

    insecure: {
      async handler (ctx) {
        this.logger.info('Say hello');

        return true;
      }
    }
  },

  /**
   * Service stopped lifecycle event handler
   */
  async stopped () {
    // await this.tortoise.destroy();
  }
};
