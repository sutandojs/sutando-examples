const { sutando, Model } = require('sutando');

class User extends Model {
  relationPosts() {
    return this.hasMany(Post, 'author_id');
  }
}

class Post extends Model {
  casts = {
    published: 'boolean'
  }

  relationAuthor() {
    return this.belongsTo(User, 'author_id');
  }
}

module.exports = {
  User,
  Post
}