const { MongoClient } = require('mongodb');

class DBClient {
  constructor () {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.connected = false;
    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.connected = true;
      })
      .catch(() => {
        this.connected = false;
      });
  }

  isAlive () {
    return this.connected;
  }

  async nbUsers () {
    this.db = this.client.db(this.database);
    const users = this.db.collection('users');
    return await users.countDocuments({}, { hint: '_id_' });
  }

  async nbFiles () {
    this.db = this.client.db(this.database);
    const files = this.db.collection('files');
    return await files.countDocuments({}, { hint: '_id_' });
  }
}

const dbClient = new DBClient();
export default dbClient;
