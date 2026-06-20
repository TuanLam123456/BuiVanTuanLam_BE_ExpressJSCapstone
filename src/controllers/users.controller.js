import { usersService } from '../services/users.service.js';
import { responseSuccess } from './../common/helpers/response.helper.js';
export const usersController = {
  async updateProfile(req, res, next) {
    try {
      const result = await usersService.updateProfile(req);
      const response = responseSuccess(result, `Update user profile successfully`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
};