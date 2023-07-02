import { createClient } from 'redis';
import configs from '../configs';

const client = createClient({ url: configs.redis_uri });

client.on('connect', () => {
  console.log('Connected to Redis.');
});

client.on('error', (error) => {
  console.error('Error connecting to Redis:', error);
});

client.connect();

export default client;
