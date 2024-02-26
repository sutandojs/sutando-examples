import { Model } from "sutando";
import Post from "./post.model";

export default class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  created_at!: Date;
  updated_at!: Date;

  relationPosts() {
    return this.hasMany(Post, 'author_id');
  }
}