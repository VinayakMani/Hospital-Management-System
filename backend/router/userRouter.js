import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  login,
  patientRegister,
  getAllDoctors,
  getUserDetails,
  logoutPatient,
  logoutAdmin,
} from "../controller/userController.js";

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

//adding the ne user /patient || doctor || Admin
router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
//for getting the all users
router.get("/doctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
//for getting the logout
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
