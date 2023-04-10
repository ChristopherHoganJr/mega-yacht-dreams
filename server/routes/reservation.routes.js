const Reservation = require("../controllers/reservation.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/reservation/:yacht_id", authenticate, Reservation.new);
  app.get(
    "/api/reservation/:reservation_id",
    authenticate,
    Reservation.getReservation
  );
  app.get("/api/reservations", authenticate, Reservation.getUserReservations);
};
