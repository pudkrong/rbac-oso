# ASC - Access Control List

This project is trying to replace existing logic with [oso](https://www.osohq.com/) library.

## Phase I
In the first phase we might not be able to follow the best practice of **RBAC** (Role Based Access Control) due to the existing feature as custom roles/permissions. Therefore, it will just find the solution to replace the existing one.

## Phase II
We can adjust or start with the proper RBAC by having predefined roles with certain permissions. With this design, we hope we will not have a big change to cope with proper RBAC

## Prerequsitions
We need `mongodb` to store users' permissions.

## How to run
1. Start application using
```
MONGO_URL=mongodb://localhost:27017/oso npm run dev
```
2. You will get moleculer prompt
```
mol $
```
3. You can test using the example commands below
  - call caller.checkChannelAdmin
  - call caller.checkChannelOwner
4. You can find all commands with prefix `caller.` via
```
mol $ actions
```

## Concept
1. We are using moleculer middleware to handle authorization. For example, we have one action
```
action1: {
  async handler (ctx) {
    // Do something
  }
}
```
Then, just add schema inside as
```
action1: {
  permissions: {
    resourceType: 'channel',
    action: 'read'
  },
  async handler (ctx) {
    // Do something
  }
}
```
2. Middleware will check `permissions` schema. If exists, then middleware will load authorizer specificed by `resourceType` and check whether the current user can / cannot take `action` to the resource.
3. All authorizers are located in `middlewares/oso/authorizers`
4. Each authorizer consists with 3 parts
  - authorizer
  - model
  - policy file (polar)
5. To deal with custom roles/permissions, we cannot define all roles/permissions inside policy file. So, we have to work around this problem by quering user's permissions and attaching to user.permissions. Then using rule to check in policy file
```
has_permission(user: User, permission: String, _: Channel) if
  p in user.permissions and
  p = permission;
```

## How to implement
### Authorizer
`authorizer.js` extends from `authorizerBase` class. It requires you to implement 2 functions
  - `getResource (ctx)`
  - `getExtraPermissions (actor, ctx)`

`getResource` defines how to get your resource data. For example, how to query channel from database

`getExtraPermissions` defines if resoure has extra permissions besides what actor already has. For example, an user might have different permissions per resource

### Model
`model.js` defines what resource looks like

### Policy
`policy.polar` defines how to grant/deny action to the resource

For example, admin is allowed to do any action on the resource
```
allow(user: User, _, _) if
  user.isAdmin = true;
```
