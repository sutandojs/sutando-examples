import express from 'express';
import 'express-async-errors';
import { sutando, ModelNotFoundError, OrderByDirection } from 'sutando';
import { User, Post } from './models';

sutando.addConnection({
  client: 'sqlite3',
  connection: {
    filename: './example.db'
  },
  useNullAsDefault: true,
});

const app = express();

app.use(express.json());

app.post(`/users`, async (req, res) => {
  const { name, email } = req.body;

  const user = new User({
    name,
    email,
  });
  await user.save();

  res.json(user);
})

app.post(`/posts`, async (req, res) => {
  const { title, content, authorEmail } = req.body;

  const author = await User.query().where('email', authorEmail).firstOrFail();

  const post = await Post.query().create({
    title,
    content,
    author_id: author.id,
  });

  res.json(post);
});

app.put('/posts/:id/views', async (req, res) => {
  const { id } = req.params;

  const post = await Post.query().findOrFail(id);
  await post.increment('views_count');

  res.json(post);
});

app.get('/users', async (req, res) => {
  const users = await User.query().withCount({
    posts: q => q.where('published', true)
  }).get();

  res.json(users);
});

app.get('/users/:id/drafts', async (req, res) => {
  const { id } = req.params;

  const drafts = await User.query()
    .with({
      posts: q => q.where('published', false),
    })
    .findOrFail(id);

  res.json(drafts);
});

app.get('/posts', async (req, res) => {
  const { searchString, page, perPage, orderBy } = req.query;

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

  res.json(posts);
});

app.get(`/posts/:id`, async (req, res) => {
  const { id } = req.params;

  const post = await Post.query().findOrFail(id);

  res.json(post);
});

app.delete(`/posts/:id`, async (req, res) => {
  const { id } = req.params;

  const post = await Post.query().findOrFail(id);
  await post.delete();

  res.json(post);
});

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params;

  const post = await Post.query().findOrFail(id);
  post.published = !post.published;
  await post.save();

  res.json(post);
});

app.use((err: Error, req: any, res: any, next: any) => {
  if (err instanceof ModelNotFoundError) {
    return res.status(404).send({
      message: err.message
    });
  }

  next(err);
});

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`),
)