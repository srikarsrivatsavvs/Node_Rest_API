module.exports = app => {
  const AdminBro = require("admin-bro");
  const AdminBroExpress = require("admin-bro-expressjs");
  const AdminBroMongoose = require("admin-bro-mongoose");
  AdminBro.registerAdapter(AdminBroMongoose);
  const Customer = require("../models/Customer");
  const Caterer = require("../models/Caterer");
  const Menu = require("../models/Menu");
  const Order = require("../models/Order");
  const AdminBroOptions = {
    resources: [Customer, Caterer, Menu, Order],
    rootPath: "/admin"
  };
  const adminBro = new AdminBro(AdminBroOptions);
  const router = AdminBroExpress.buildRouter(adminBro);
  app.use("/admin", router);
};
