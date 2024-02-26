import { sutando, Model } from 'sutando';

export class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  created_at!: Date;
  updated_at!: Date;

  relationPosts() {
    return this.hasMany(Post, 'author_id');
  }
}

export class Post extends Model {
  id!: number;
  author_id!: number;
  title!: string;
  content!: string;
  created_at!: Date;
  updated_at!: Date;
  published!: boolean;
  views_count!: number;

  casts = {
    published: 'boolean'
  }

  relationAuthor() {
    return this.belongsTo(User, 'author_id');
  }
}
