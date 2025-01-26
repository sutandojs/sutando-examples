import { Model, HasUniqueIds } from 'sutando';
import { v4 as uuid } from 'uuid';

const UuidModel = HasUniqueIds(Model) as typeof Model;

export class User extends Model {
  table = 'users';

  id!: number;
  first_name!: string;
  last_name!: string;
  email!: string;
  created_at!: Date;
  updated_at!: Date;

  relationPosts() {
    return this.hasMany(Post, 'author_id');
  }
}

export class Post extends UuidModel {
  table = 'posts';

  id!: string;
  author_id!: number;
  title!: string;
  content!: string;
  created_at!: Date;
  updated_at!: Date;
  published_at!: Date;
  views_count!: number;

  casts = {
    published_at: 'datetime'
  }

  newUniqueId(): string {
    return uuid();
  }

  relationAuthor() {
    return this.belongsTo(User, 'author_id');
  }
}
