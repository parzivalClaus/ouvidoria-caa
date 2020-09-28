import 'dotenv/config';

import Queue from './lib/Queue';

console.log('📧 Mail-server started!');

Queue.processQueue();
