
import User from '../src/user.model';
import { sutando } from 'sutando';

sutando.addConnection({
  client: 'sqlite3',
  connection: {
    filename: './example.db'
  },
  useNullAsDefault: true,
});

const userData = [
  {
    name: 'Alice',
    email: 'alice@sutando.org',
    posts: [
      {
        title: 'Check out Sutando on GitHub',
        content: 'https://github.com/sutandojs/sutando',
        published: true,
      },
    ],
  },
  {
    name: 'Nilu',
    email: 'nilu@sutando.org',
    posts: [
      {
        title: 'Sutando Documentation',
        content: 'https://sutando.org',
        published: true,
      },
    ],
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@sutando.org',
    posts: [
      {
        title: 'Contribute to Sutando on GitHub',
        content: 'https://github.com/sutandojs/sutando/issues',
        published: true,
      },
      {
        title: 'Pull Requests for Sutando',
        content: 'https://github.com/sutandojs/sutando/pulls',
        published: false,
      },
    ],
  },
]

const main = async () => {
  console.log(`Start seeding ...`)

  for (let u of userData) {
    const user = new User({
      name: u.name,
      email: u.email,
    });
    await user.save();

    const posts = await user.related('posts').createMany(u.posts);
    console.log(`Created user with id: ${user.id}`)
  }

  console.log(`Seeding finished.`)

  const connection = sutando.connection() as any;
  await connection.destroy();
}

main();
