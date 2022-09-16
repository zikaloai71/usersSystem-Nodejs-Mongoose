const userDb = require("../db/models/user.model");

class User {
  static index = async (req, res) => {
    try {
      let result = await userDb.find();
      res.render("home", {
        pageTitle: "home page",
        result,
        noUsers: result.length === 0 ? true : false,
      });
    } catch (e) {
      res.send(e);
    }
  };
  static add = (req, res) => {
    res.render("add", {
      pageTitle: "add page",
    });
  };

  static getAddLogic = async (req, res) => {
    try {
      let user = new userDb(req.query);
      await user.save();
      res.redirect("/");
    } catch (e) {
      res.send(e);
    }
  };


}
module.exports = User;