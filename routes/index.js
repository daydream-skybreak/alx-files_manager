import AppController from '../controllers/AppController';

/**
 * sets routes with their corresponding handlers
 * @param {Express} api
 */
const routes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
};

export default routes;
