import userModel from './user.model';
import extendService from '../utils/extend-service';

export default {
  ...extendService(userModel)
};
