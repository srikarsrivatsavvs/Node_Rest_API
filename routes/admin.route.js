module.exports = app => {
  const AdminBro = require("admin-bro");
  const AdminBroExpress = require("admin-bro-expressjs");
  const AdminBroMongoose = require("admin-bro-mongoose");
  AdminBro.registerAdapter(AdminBroMongoose);
  const Customer = require("../models/Customer");
  const Caterer = require("../models/Caterer");
  const Menu = require("../models/Menu");
  const Order = require("../models/Order");
  const Token = require("../models/Token");
  const AdminBroOptions = {
    resources: [Customer, Caterer, Menu, Order, Token],
    branding: {
      companyName: "Catersmart"
    },
    rootPath: "/admin"
  };
  const adminBro = new AdminBro(AdminBroOptions);

  const ADMIN = {
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "nodejs"
  };

  const router = AdminBroExpress.buildRouter(adminBro);
  // const router = AdminBroExpress.buildAuthenticatedRouter(
  //   adminBro,
  //   {
  //     authenticate: async (email, password) => {
  //       console.log(email, password);
  //       if (ADMIN.password === password && ADMIN.email === email) {
  //         return ADMIN;
  //       }
  //       return false;
  //     },
  //     cookieName: "admin-bro",
  //     cookiePassword: "somepassword"
  //   },
  //   undefined,
  //   { resave: false, saveUninitialized: true }
  // );
  app.use(AdminBroOptions.rootPath, router);
};
