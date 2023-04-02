#!/usr/bin/node
import { createClient } from 'redis';
import { promisify } from 'util';

/**
 * represents a Redis client
 */
class RedisClient {
  /**
   * @constructor to create a redis client and create connection to the server
   */
  constructor() {
    this.client = createClient();
    this.isConnected = true;
    this.client.on('error', (err) => {
      console.log('Error occurred:', err.message || err.toString());
      this.isConnected = false;
    });
    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  /**
   * isAlive - returns if the client is connected or not
   * @returns {boolean|*}
   */
  isAlive() {
    return this.isConnected;
  }

  /**
     * gets a value from a redis client
     * @param { String } key
     * @returns {String | Object} value stored in that key
     */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
     * sets a key with a value in a given duration
     * @param {String} key
     * @param {String | Number | Boolean} value - item to be stored
     * @param {Number} duration - time for expiration
     * @returns void
     */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
