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