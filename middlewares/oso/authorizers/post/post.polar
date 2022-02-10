actor User {}

resource Post {
  # permissions = [];
  # roles = [];
}

has_permission(user: User, permission: String, _: Post) if
  # print("user permission") and
  p in user.permissions and
  p = permission;

has_permission(user: User, _: String, post: Post) if
  # print("owner") and
  user.userId = post.userId;

allow(actor, action, resource) if
  has_permission(actor, action, resource);

allow(user: User, _, _) if
  user.isAdmin = true;
