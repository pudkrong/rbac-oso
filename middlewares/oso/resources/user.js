class User {
  constructor (user) {
    Object.keys(user).forEach(prop => {
      this[prop] = user[prop];
    });

    this.permissions = [];
    this.roles = [];
  }

  setUserPermissions (permissions) {
    this.permissions = permissions.map(_ => _.toLowerCase());
    this.convertToRoles();
  }

  setExtraUserPermissions (permissions) {
    this.permissions = this.permissions.concat(permissions.map(_ => _.toLowerCase()));
    this.convertToRoles();
  }

  convertToRoles () {
    this.roles = this.permissions.map(permission => {
      return `role_${permission}`;
    });
  }
}

module.exports = User;
