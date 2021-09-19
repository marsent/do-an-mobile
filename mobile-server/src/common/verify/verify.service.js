import extendService from '../utils/extend-service';
import verifyModel from './verify.model';

export default {
  ...extendService(verifyModel),
  deleteOne(query) {
    verifyModel.deleteOne(query).exec();
  }
};
