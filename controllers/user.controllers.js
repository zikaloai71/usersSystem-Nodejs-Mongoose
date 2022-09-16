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
    let user = new userDb(req.query);
    try {
      await user.save();
      res.redirect("/");

    } catch (e) {
      res.render("add", {
        pageTitle: "add page",
        user,
        errorMessage:e,
      });
    }
  };
  
  static single = async (req, res) => {
    try {
      const user = await userDb.findById(req.params.id);
      res.render("single", {
        pageTitle: "single user",
        user,
      });
    } catch (e) {
      res.send(e.message);
    }
  };

  static delete = async (req, res) => {
    try {
      await userDb.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (e) {
      res.send(e.message);
    }
  };

  static toggle = async (req, res) => {
    try {
      const user = await userDb.findById(req.params.id);
      user.activeStatus = user.activeStatus ? "" : "on";
      await user.save();
      res.redirect("/");
    } catch (e) {
      res.send(e.message);
    }
  };

  static edit = async (req, res) => {
    try {
      const user = await userDb.findById(req.params.id);
      res.render("edit", {
        pageTitle: "edit user",
        user,
      });
    } catch (e) {
      res.send(e.message);
    }
  };

  static editPost = async (req, res) => {
    const user = await userDb.findById(req.params.id);
    try {
      await userDb.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
      });
      res.redirect(`/single/${req.params.id}`);
    } catch (e) {
      res.render("edit", {
        pageTitle: "edit page",
        user,
        errorMessage:e,
      });
    }
  };

  static addAddress = async (req, res) => {
    res.render("addAddress", {
      pageTitle: "add address",
    });
  };

  static addAddressPost = async (req, res) => {
    try {
      const result = await userDb.findById(req.params.id);
      result.addresses.push(req.body);
      await result.save();
      res.redirect(`/single/${req.params.id}`);
    } catch (e) {
      res.send(e.message);
    }
  };

  static deleteAddress = async (req, res) => {
    try {
      const user = await userDb.findOne({
        "addresses._id": req.params.delId,
      });
      let i = user.addresses.findIndex((a) => a.id == req.params.delId);
      user.addresses.splice(i, 1);
      await user.save();
      res.redirect(`/single/${user._id}`);
    } catch (e) {
      res.send(e);
    }
  };

  static editAddress = async (req, res) => {
    try {
      const user = await userDb.findOne({
        "addresses._id": req.params.editId,
      });
      let address = user.addresses.find((a) => a.id == req.params.editId);
      res.render("editAddress", {
        pageTitle: "edit address",
        address,
      });
    } catch (e) {
      res.send(e.message);
    }
  };

  static editAddressPost = async (req, res) => {
    try {
      const user = await userDb.findOne({
        "addresses._id": req.params.editId,
      });
      let address = user.addresses.find((a) => a.id == req.params.editId);
      address.addressType = req.body.addressType;
      address.addressDetail = req.body.addressDetail;
      await user.save();
      res.redirect(`/single/${user._id}`);
    } catch (e) {
      res.send(e.message);
    }
  };

}
module.exports = User;
