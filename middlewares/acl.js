const { User } = require('./oso/resources');
const resources = require('./oso/authorizers');

class ACL {
  getPermissionsFromAction (action) {
    const { permissions } = action;
    return permissions;
  }

  async authorize (actor, permissionScheme, ctx) {
    const authorizer = resources[permissionScheme.resourceType];
    if (!authorizer) throw new Error(`Cannot find authorizer for ${permissionScheme.resourceType}`);

    return authorizer.authorize(actor, permissionScheme, ctx);
  }

  async check ({ permissionScheme, ctx }) {
    // TONOTE::PUD Create user model for Oso
    const actor = new User(ctx.meta);
    const permissions = await ctx.call('v3.user._getUserPermissions', { userId: ctx.meta.userId });
    actor.setUserPermissions(permissions);

    await this.authorize(actor, permissionScheme, ctx);
  }

  // TONOTE::PUD This should be in the business logic or just separate endpoint for admin
  checkRestrictedParams (permissionScheme, ctx) {
    // allow only super admin to pass this params
    if (permissionScheme.restrictedParams && permissionScheme.restrictedParams.length > 0) {
      const restrictedKey = permissionScheme.restrictedParams.find(
        (keyName) => Object.keys(ctx.params).indexOf(keyName) !== -1
      );

      if (restrictedKey) throw new Error(`You are not allowed to put ${restrictedKey} in params`);
    }
  }

  middleware () {
    return {
      name: 'ACL',
      localAction: (handler, action) => {
        if (!action.permissions) return handler;

        const permissionScheme = this.getPermissionsFromAction(action);

        if (!permissionScheme) return handler;

        return async (ctx) => {
          // TONOTE::PUD Do NOT do this
          ctx.logger = action.service.logger;
          await this.check({
            permissionScheme,
            ctx
          });
          return handler(ctx);
        };
      }
    };
  }
}

module.exports = ACL;
