const Yacht = require("../controllers/yacht.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/yacht/new", authenticate, Yacht.new);
  app.put("/api/yacht/update", authenticate, Yacht.update);
  app.get("/api/yacht/user", authenticate, Yacht.userYachts);
  app.get("/api/yacht/:yacht_id", Yacht.getYacht);
  app.get("/api/yachts/", Yacht.getAll);
};
