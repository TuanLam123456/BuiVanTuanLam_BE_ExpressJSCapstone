import { commentsService } from "../services/comments.service.js";
import { responseSuccess } from "./../common/helpers/response.helper.js";
export const commentsController = {
  async findByImageId(req,res,next){
    const result = await commentsService.findByImageId(req);
    const response = responseSuccess(result,`Get comments for image #${req.params.hinhId} successfully`)
    res.status(response.statusCode).json(response);
  }
};
