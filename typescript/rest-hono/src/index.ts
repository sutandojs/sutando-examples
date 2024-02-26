import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { ModelNotFoundError, sutando } from 'sutando';
import { Post, User } from './models';
import type { OrderByDirection } from 'sutando';

sutando.addConnection({
  client: 'sqlite3',
  connection: {
    filename: './example.db'
  },
  useNullAsDefault: true,
});

const app = new Hono();

app.post(`/users`, async (c) => {
  const body = await c.req.json();
  const { name, email } = body;

  const user = new User({
    name,
    email,
  });
  await user.save();

  return c.json(user);
});

app.post(`/posts`, async (c) => {
  const body = await c.req.json();
  const { title, content, authorEmail } = body;
  const author = await User.query().where('email', authorEmail).firstOrFail();

  const post = await Post.query().create({
    title,
    content,
    author_id: author.id,
  });

  return c.json(post);
});

app.put('/posts/:id/views', async (c) => {
  const { id } = c.req.param();

  const post = await Post.query().findOrFail(id);
  await post.increment('views_count');

  return c.json(post);
});

app.get('/users', async (c) => {
  const users = await User.query().withCount({
    posts: q => q.where('published', true)
  }).get();
  return c.json(users);
});

app.get('/users/:id/drafts', async (c) => {
  const { id } = c.req.param();

  const drafts = await User.query()
    .with({
      posts: q => q.where('published', false),
    })
    .findOrFail(id);

  return c.json(drafts);
});

app.get('/posts', async (c) => {
  const { searchString, page, perPage, orderBy } = c.req.query();

  const query = Post.query()
    .with('author')
    .where('published', true);
  
  if (searchString) {
    query.where(q => q.where('title', 'like', `%${searchString}%`).orWhere('content', 'like', `%${searchString}%`))
  }

  if (orderBy) {
    query.orderBy('updated_at', orderBy as OrderByDirection);
  }
    
  const posts = await query.paginate(Number(page), Number(perPage));

  return c.json(posts);
});

app.get(`/posts/:id`, async (c) => {
  const { id } = c.req.param();

  const post = await Post.query().findOrFail(id);

  return c.json(post);
});

app.delete(`/posts/:id`, async (c) => {
  const { id } = c.req.param();

  const post = await Post.query().findOrFail(id);
  await post.delete();

  return c.json(post);
});

app.put('/publish/:id', async (c) => {
  const { id } = c.req.param();

  const post = await Post.query().findOrFail(id);
  post.published = !post.published;
  await post.save();

  return c.json(post);
});

app.onError((err, c) => {
  if (err instanceof ModelNotFoundError) {
    return c.json({
      message: err.message
    }, 404);
  }

  return c.json({
    message: 'Something went wrong'
  }, 500);
});

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
