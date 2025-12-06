module.exports.generateNum = (length) => {
  const chars = "0123456789";
  let res ="";
  for(let i = 0; i<length;i++){
    res += Math.floor(Math.random()*chars.length);
  }
  return res;
};