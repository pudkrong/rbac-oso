actor User {}

resource UserResource {
  # permissions = [];
  # roles = [];
}

has_permission(user: User, _: String, userResource: UserResource) if
  user.userId = userResource.userId;

allow(actor, action, resource) if
  has_permission(actor, action, resource);

allow(user: User, _, _) if
  user.isAdmin = true;
