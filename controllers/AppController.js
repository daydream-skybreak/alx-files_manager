import dbClient from '../utils/db';
import redisClient from '../utils/redis';

/**
 * AppController - servers as an api handler
 */
export default class AppController {
  /**
     * gets the connection status of the redis and mongodb servers
     * @param req
     * @param res
     */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
     * getStats - fetches the number of users and files in the database
     * @param req
     * @param res
     */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()])
      .then(([uCount, fCount]) => {
        res.status(200).json({
          users: uCount,
          files: fCount,
        });
      });
  }
}
