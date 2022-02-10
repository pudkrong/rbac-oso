actor User {}

resource UserResource {
  permissions = ["read", "edit", "delete", "list"];
  roles = ["user", "moderator"];

  "read" if "user";
  "list" if "user";

  "user" if "moderator";
  "edit" if "moderator";
  "delete" if "moderator";
}

has_role(user: User, role: String, _channel: Channel) if
	x in user.roles and
	x = role;

has_permission(_user: User, action: String, _: UserResource) if
  action = "list";

has_permission(user: User, _: String, userResource: UserResource) if
  user.userId = userResource.userId;

allow(actor, action, resource) if
  has_permission(actor, action, resource);

allow(user: User, _, _) if
  user.isAdmin = true;
