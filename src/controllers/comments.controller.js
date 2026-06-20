import { commentsService } from "../services/comments.service.js";
import { responseSuccess } from "./../common/helpers/response.helper.js";
export const commentsController = {
  // Find comments by image id
  async findByImageId(req,res,next){
    const result = await commentsService.findByImageId(req);
    const response = responseSuccess(result,`Get comments for image #${req.params.hinhId} successfully`)
    res.status(response.statusCode).json(response);
  },
  // Comment images
  async create(req,res,next){
    const result = await commentsService.create(req)
    const response = responseSuccess(result,`Create comment successfully`)
    res.status(response.statusCode).json(response);
  }
};
