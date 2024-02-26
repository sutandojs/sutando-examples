import { Injectable } from '@nestjs/common';
import { sutando } from 'sutando';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    console.log('onModuleInit');
    sutando.addConnection({
      client: 'sqlite3', // or 'better-sqlite3'
      connection: {
        filename: "./example.db"
      },
    });
  }
}
