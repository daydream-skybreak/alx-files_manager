const { MongoClient } = require('mongodb');

/**
 * DBClient - class for creating and managing connection to mongo db
 */
class DBClient {
  /**
     * constructor for creating and verifying mongodb connection
     *
      */
  constructor() {
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

  /**
     * checks whether connection was created or not
     * @returns {boolean|*}
     */
  isAlive() {
    return this.connected;
  }

  /**
     * counts the number of users in file_manager db
     * @returns {Promise<*>}
     */
  async nbUsers() {
    this.db = this.client.db(this.database);
    const users = this.db.collection('users');
    const total = await users.countDocuments({}, { hint: '_id_' });
    return total;
  }

  /**
     * counts the number of files in the file_manager db
     * @returns {Promise<*>}
     */
  async nbFiles() {
    this.db = this.client.db(this.database);
    const files = this.db.collection('files');
    const total = await files.countDocuments({}, { hint: '_id_' });
    return total;
  }
}

const dbClient = new DBClient();
export default dbClient;
