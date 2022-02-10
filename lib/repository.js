const db = require('./db');

const users = [
  {
    userId: 'user',
    networkId: 'network01',
    isAdmin: false,
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'username'
  },
  {
    userId: 'admin',
    networkId: 'network01',
    isAdmin: true,
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'admin'
  },
  {
    userId: 'other',
    networkId: 'network01',
    isAdmin: false,
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'other'
  }
];

const userPermissions = [
  {
    userId: 'user',
    permissions: ['User/ExemptFromFilters']
  }
];

const channels = [
  {
    channelId: 'channel01',
    userId: 'user',
    name: 'Channel 01'
  },
  {
    channelId: 'channel02',
    userId: 'other',
    name: 'Channel 02'
  }
];

const channelUsers = [
  {
    userId: 'user',
    channelId: 'channel01',
    permissions: ['EDIT_MESSAGE']
  },
  {
    userId: 'user',
    channelId: 'channel02',
    permissions: ['EDIT_CHANNEL']
  },
  {
    userId: 'other',
    channelId: 'channel02',
    permissions: ['EDIT_CHANNEL']
  },
  {
    userId: 'user',
    channelId: 'community02',
    permissions: ['ADD_COMMUNITY_USER', 'EDIT_COMMUNITY_POST', 'DELETE_COMMUNITY_COMMENT']
  },
  {
    userId: 'other',
    channelId: 'community02',
    permissions: ['ADD_COMMUNITY_USER']
  }
];

const communities = [
  {
    communityId: 'community01',
    userId: 'user',
    channelId: 'community01',
    name: 'Community 01'
  },
  {
    communityId: 'community02',
    userId: 'other',
    channelId: 'community02',
    name: 'Community 02'
  }
];

const posts = [
  {
    postId: 'post01',
    targetType: 'community',
    targetId: 'community02',
    userId: 'user'
  },
  {
    postId: 'post02',
    targetType: 'community',
    targetId: 'community02',
    userId: 'other'
  }
];

const comments = [
  {
    commentId: 'comment01',
    userId: 'user',
    referenceId: 'post01',
    referenceType: 'post'
  },
  {
    commentId: 'comment02',
    userId: 'other',
    referenceId: 'post01',
    referenceType: 'post'
  }
];

const messages = [
  {
    messageId: 'message01',
    channelId: 'channel01',
    userId: 'user',
    data: 'Message 01'
  },
  {
    messageId: 'message02',
    channelId: 'channel01',
    userId: 'other',
    data: 'Message 02'
  },
];

class Repository {
  constructor () {
    this.User = db.collection('users');
    this.UserPermission = db.collection('user-permissions');
    this.Channel = db.collection('channels');
    this.ChannelUser = db.collection('channel-users');
    this.Community = db.collection('communities');
    this.Post = db.collection('post');
    this.Comment = db.collection('comments');
    this.Message = db.collection('messages');
  }

  async init () {
    const admin = await this.User.findOne({ userId: 'admin' });
    if (!admin) {
      await this.prepareData();
    }
  }
  async prepareData () {
    return Promise.all([
      this.User.insertMany(users),
      this.UserPermission.insertMany(userPermissions),
      this.Channel.insertMany(channels),
      this.ChannelUser.insertMany(channelUsers),
      this.Community.insertMany(communities),
      this.Post.insertMany(posts),
      this.Comment.insertMany(comments),
      this.Message.insertMany(messages)
    ]);
  }
}

module.exports = Repository;
