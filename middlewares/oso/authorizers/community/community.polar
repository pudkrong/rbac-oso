actor User {}

resource Community {
  # permissions = [];
  # roles = [];
}

has_permission(user: User, permission: String, _: Community) if
  # print("user permission") and
  p in user.permissions and
  p = permission;

has_permission(user: User, _: String, community: Community) if
  # print("owner") and
  user.userId = community.userId;

allow(actor, action, resource) if
  has_permission(actor, action, resource);

allow(user: User, _, _) if
  user.isAdmin = true;

allow(user: User, _, _) if
  user.userId = "global-admin";
