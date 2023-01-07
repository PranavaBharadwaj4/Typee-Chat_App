const {
  register,
  login,
  setIcon,
  getAllUsers,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setIcon/:id", setIcon);
router.get("/allusers/:id", getAllUsers);
module.exports = router;
