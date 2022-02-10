actor User {}

resource Message {
  # permissions = [];
  # roles = [];
}

# Check user permissions
has_permission(user: User, permission: String, _: Message) if
  # print("user permission") and
  p in user.permissions and
  p = permission;

# User is creator
has_permission(user: User, _: String, message: Message) if
  # print("owner") and
  user.userId = message.userId;

allow(actor, action, resource) if
  has_permission(actor, action, resource);


allow(user: User, _, _) if
  user.isAdmin = true;
