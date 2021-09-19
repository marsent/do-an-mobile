import extendService from '../utils/extend-service';
import adminModel from './admin.model';

export default {
  ...extendService(adminModel)
};
