const Category = require("../models/category.model")

const buildCategoryTree = (category, parentID ="") =>{
  const tree = [];
  for(const item of category) {
    if(item.parent == parentID){
      const children = this.buildCategoryTree(category, item.id)
      tree.push({
        id: item.id,
        name:item.name,
        slug:item.slug,
        children: children
      })
    }
  }
  return tree;
}

module.exports.buildCategoryTree = buildCategoryTree;


// get CategoryChild
const getCategoryChild = async (parentId) =>{
  const result = [];
  const childList = await Category.find({
    status:"active",
    deleted:false,
    parent: parentId
  })
  for (const item of childList){
    result.push({
      id:item.id,
      name: item.name
    });
  }
  return result;
}
module.exports.getCategoryChild = getCategoryChild;
// get CategoryChild