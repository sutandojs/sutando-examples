import { Model } from "sutando";
import User from "./user.model";

export default class Post extends Model {
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