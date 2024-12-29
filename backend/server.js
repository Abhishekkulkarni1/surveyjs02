const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});