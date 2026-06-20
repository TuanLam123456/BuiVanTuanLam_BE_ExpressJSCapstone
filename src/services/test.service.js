export const testService = {
   async create(req) {
      return `This action create`;
   },

   async findAll(req) {
      return `This action returns all test`;
   },

   async findOne(req) {
      return `This action returns a id: ${req.params.id} test`;
   },

   async update(req) {
      return `This action updates a id: ${req.params.id} test`;
   },

   async remove(req) {
      return `This action removes a id: ${req.params.id} test`;
   }
};