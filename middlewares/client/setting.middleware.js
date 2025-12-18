const SettingWebsiteInfo = require("../../models/websiteInfor.model");

module.exports.websiteInfor = async (req, res, next) => {
  const settingWebsiteInfo = await SettingWebsiteInfo.findOne({});
  res.locals.settingWebsiteInfo = settingWebsiteInfo;

  next();
}
