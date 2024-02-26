import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common'
import { Collection, Paginator } from 'sutando';
import UserModel from './user.model';
import PostModel from './post.model';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('posts/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return PostModel.query().findOrFail(Number(id))
  }

  @Get('posts')
  async getFilteredPosts(
    @Query('page') page?: number,
    @Query('perPage') perPage?: number,
    @Query('searchString') search?: string,
    @Query('orderBy') order?: 'asc' | 'desc',
  ): Promise<Paginator<PostModel>> {
    const query = PostModel.query()
      .with('author')
      .where('published', true);
    
    if (search) {
      query.where(q => q.where('title', 'like', `%${search}%`).orWhere('content', 'like', `%${search}%`))
    }

    if (order) {
      query.orderBy('updated_at', order);
    }
      
    const posts = await query.paginate(page, perPage);

    return posts;
  }

  @Get('users')
  async getAllUsers(): Promise<Collection<UserModel>> {
    return UserModel.query().withCount({
      posts: q => q.where('published', true)
    }).get();
  }

  @Get('users/:id/drafts')
  async getDraftsByUser(@Param('id') id: string): Promise<Collection<PostModel>> {
    return await PostModel.query()
      .whereRelation('author', 'id', id)
      .where('published', false)
      .get();
  }

  @Post('posts')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData

    const user = await UserModel.query().where('email', authorEmail).first();
    const post = new PostModel({
      title,
      content
    });
    await user.related('posts').save(post);

    return post;
  }

  @Post('users')
  async signupUser(
    @Body()
    userData: {
      name?: string
      email: string
    },
  ): Promise<UserModel> {
    const user = new UserModel({
      name: userData?.name,
      email: userData.email,
    });
    await user.save();

    return user;
  }

  @Put('publish/:id')
  async togglePublishPost(@Param('id') id: string): Promise<PostModel> {
    const post = await PostModel.query().findOrFail(id);
    post.published = !post.published;
    await post.save();

    return post;
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    const post = await PostModel.query().findOrFail(id);
    await post.delete();
    return post;
  }

  @Put('/posts/:id/views')
  async incrementPostViewCount(@Param('id') id: string): Promise<PostModel> {
    const post = await PostModel.query().findOrFail(id);
    await post.increment('views_count');
    return post;
  }
}