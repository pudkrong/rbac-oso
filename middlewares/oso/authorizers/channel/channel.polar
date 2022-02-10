actor User {}

resource Channel {
  # permissions = [];
  # roles = [];
}

# Check permission
has_permission(user: User, permission: String, _: Channel) if
  # print("user permission") and
  p in user.permissions and
  p = permission;

# Owner
has_permission(user: User, _: String, channel: Channel) if
  # print("owner") and
  user.userId = channel.userId;

allow(actor, action, resource) if
  has_permission(actor, action, resource);

# Admin
allow(user: User, _, _) if
  user.isAdmin = true;
