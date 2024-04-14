import { Model, HasUniqueIds } from 'sutando';
import { v4 as uuid } from 'uuid';

const BaseModel = HasUniqueIds(Model) as typeof Model;

export class User extends BaseModel {
  table = 'users';

  id!: string;
  name!: string;
  email!: string;
  created_at!: Date;
  updated_at!: Date;

  newUniqueId(): string {
    return uuid();
  }

  relationPosts() {
    return this.hasMany(Post, 'author_id');
  }
}

export class Post extends BaseModel {
  table = 'posts';

  id!: string;
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

  newUniqueId(): string {
    return uuid();
  }

  relationAuthor() {
    return this.belongsTo(User, 'author_id');
  }
}
