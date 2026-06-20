import { testService } from '../services/test.service.js';
import { responseSuccess } from './../common/helpers/response.helper.js';
export const testController = {

   async create(req, res, next) {
      const result = await testService.create(req);
      const response = responseSuccess(result, `Create test successfully`);
      res.status(response.statusCode).json(response);
   },

   async findAll(req, res, next) {
      const result = await testService.findAll(req);
      const response = responseSuccess(result, `Get all tests successfully`);
      res.status(response.statusCode).json(response);
   },

   async findOne(req, res, next) {
      const result = await testService.findOne(req);
      const response = responseSuccess(result, `Get test #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async update(req, res, next) {
      const result = await testService.update(req);
      const response = responseSuccess(result, `Update test #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   async remove(req, res, next) {
      const result = await testService.remove(req);
      const response = responseSuccess(result, `Remove test #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   }
};