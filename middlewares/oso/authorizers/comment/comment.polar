actor User {}

resource Comment {
  # permissions = [];
  # roles = [];
}

has_permission(user: User, permission: String, _: Comment) if
  # print("user permission") and
  p in user.permissions and
  p = permission;

has_permission(user: User, _: String, comment: Comment) if
  # print("owner") and
  user.userId = comment.userId;

allow(actor, action, resource) if
  has_permission(actor, action, resource);

# Allow all comments that is not `Post`
allow(_, _, comment: Comment) if
  comment.referenceType != "post";

allow(user: User, _, _) if
  user.isAdmin = true;
