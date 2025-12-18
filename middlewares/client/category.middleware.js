const Category = require("../../models/category.model");
const {buildCategoryTree} = require("../../helpers/category.helper")

module.exports.list = async (req, res, next) => {
   const categoryList = await Category.find({
    deleted:false,
    status:"active"
  }).sort({
    positon:"desc"
  })

  const categoryTree = buildCategoryTree(categoryList);
  res.locals.categoryList = categoryTree;
  next();
}
