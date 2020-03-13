const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);

router.get("/api/customers", (req, res) => {
   const customers = [
     {name: "Tmm"},
     {name: "Angela"},
     {name: "Ethan"},
     {name: "Gianna"}
   ];
   res.json(customers)
})

module.exports = router;