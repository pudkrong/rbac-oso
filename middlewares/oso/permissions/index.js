const Channel = {
  BanUser: 'Channel/BanUser',
  MuteUser: 'Channel/MuteUser',
  MuteChannel: 'Channel/MuteChannel',
  RateLimitUser: 'Channel/RateLimitUser',
  RateLimitChannel: 'Channel/RateLimitChannel',
  ManageMessages: 'Channel/ManageMessages',
  ManageUsers: 'Channel/ManageUsers',
  GlobalAccess: 'Channel/GlobalAccess'
};

const User = {
  ExemptFromFilters: 'User/ExemptFromFilters',
  ExemptFromRateLimits: 'User/ExemptFromRateLimits',
  ExemptFromMute: 'User/ExemptFromMute',
  ExemptFromBan: 'User/ExempFromBan',
  ExemptFromWhitelist: 'User/ExempFromWhitelist',
  ExemptFromBlacklist: 'User/ExempFromBlacklist',
  ExemptFromRepetitionCheck: 'User/ExempFromRepetitionCheck'
};

const Post = {
  ManagePosts: 'Post/ManagePosts'
};

const Comment = {
  ManageComments: 'Post/ManageComments'
};

const Community = {
  ManageCommunities: 'Community/ManageCommunities'
};

const ChannelV3 = {
  MuteChannel: 'MUTE_CHANNEL',
  CloseChannel: 'CLOSE_CHANNEL',
  EditChannel: 'EDIT_CHANNEL',
  EditChannelRateLimit: 'EDIT_CHANNEL_RATELIMIT',
  EditMessage: 'EDIT_MESSAGE',
  DeleteMessage: 'DELETE_MESSAGE',
  BanChannelUser: 'BAN_USER_FROM_CHANNEL',
  MuteChannelUser: 'MUTE_USER_INSIDE_CHANNEL',
  AddChannelUser: 'ADD_CHANNEL_USER',
  RemoveChannelUser: 'REMOVE_CHANNEL_USER',
  EditChannelUser: 'EDIT_CHANNEL_USER'
};

const UserV3 = {
  BanUser: 'BAN_USER',
  EditUser: 'EDIT_USER',
  AssignUserRole: 'ASSIGN_USER_ROLE'
};

const UserFeed = {
  EditUserFeedPost: 'EDIT_USER_FEED_POST',
  DeleteUserFeedPost: 'DELETE_USER_FEED_POST',
  EditUserFeedComment: 'EDIT_USER_FEED_COMMENT',
  DeleteUserFeedComment: 'DELETE_USER_FEED_COMMENT'
};

const CommunityV3 = {
  AddCommunityUser: 'ADD_COMMUNITY_USER',
  BanCommunityUser: 'BAN_COMMUNITY_USER',
  MuteCommunityUser: 'MUTE_COMMUNITY_USER',
  RemoveCommunityUser: 'REMOVE_COMMUNITY_USER',
  EditCommunityUser: 'EDIT_COMMUNITY_USER',
  EditCommunity: 'EDIT_COMMUNITY',
  DeleteCommunity: 'DELETE_COMMUNITY',
  EditCommunityPost: 'EDIT_COMMUNITY_POST',
  DeleteCommunityPost: 'DELETE_COMMUNITY_POST',
  ReviewCommunityPost: 'REVIEW_COMMUNITY_POST',
  EditCommunityComment: 'EDIT_COMMUNITY_COMMENT',
  DeleteCommunityComment: 'DELETE_COMMUNITY_COMMENT'
};

const CommunityCategory = {
  CreateCommunityCategory: 'CREATE_COMMUNITY_CATEGORY',
  EditCommunityCategory: 'EDIT_COMMUNITY_CATEGORY',
  DeleteCommunityCategory: 'DELETE_COMMUNITY_CATEGORY'
};

const Role = {
  CreateRole: 'CREATE_ROLE',
  EditRole: 'EDIT_ROLE',
  DeleteRole: 'DELETE_ROLE'
};

const Notification = {
  ManageNetworkSetting: 'MANAGE_NOTIFICATION_NETWORK_SETTING'
};

const getPermissionEnum = () => {
  return Object.values({
    ...ChannelV3,
    ...UserV3,
    ...UserFeed,
    ...CommunityV3,
    ...CommunityCategory,
    ...Role,
    ...Notification
  });
};

module.exports = {
  Channel,
  User,
  Post,
  Comment,
  Community,
  ChannelV3,
  UserV3,
  UserFeed,
  CommunityV3,
  CommunityCategory,
  Role,
  Notification,
  getPermissionEnum
};
