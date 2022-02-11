const { extendWith } = require('lodash');
const { Oso, NotFoundError } = require('oso');
const { isConstructor } = require('oso/dist/src/helpers');
const { User } = require('../resources/index');

class BaseAuthorizer {
  constructor (classes, policy) {
    this.init(classes, policy);
  }

  async init (classes, policy) {
    const oso = new Oso();

    oso.registerClass(User);
    classes.forEach(c => oso.registerClass(c));
    await oso.loadFiles([policy]);

    this.oso = oso;
  }

  // TODO::PUD Might be interface that dev has to specific
  async getResource (ctx) {
    throw new Error('Not implement');
  }

  // TODO::PUD Might be interface that dev has to specific
  async getExtraPermissions (actor, ctx) {
    throw new Error('Not implement');
  }

  async authorize (actor, scheme, ctx) {
    ctx.logger.debug(`User permissions: `, actor.permissions, scheme);

    // TONOTE::PUD These 2 below lines must wait the resource
    const resource = await this.getResource(ctx);
    await this.getExtraPermissions(actor, ctx);

    console.log('OSO actor: ', actor);
    console.log('OSO action: ', scheme.action);
    console.log('OSO resource: ', resource);
    if (Array.isArray(scheme.action)) {
      const promises = scheme.action.map(_ => this.oso.authorize(actor, _.toLowerCase(), resource));
      return Promise.any(promises).catch((aggErrors) => {
        throw aggErrors.errors[0];
      });
    } else {
      return this.oso.authorize(actor, scheme.action.toLowerCase(), resource);
    }
  }
}

module.exports = BaseAuthorizer;
