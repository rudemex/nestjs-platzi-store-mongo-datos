import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri = `mongodb://localhost:27017`;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        return client.db('platzi-store');
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
