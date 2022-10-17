const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * This function comment is parsed by doctrine
 * @route GET /supervisors
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - ERROR: Failed to fetch supervisors
 */
router.get("/supervisors", async (req, res) => {
  try {
    console.log("Fetching and sorting managers...");
    const { data: managers } = await axios.get(
      "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers"
    );

    // Remove numeric jurisdictions
    const filteredManagers = managers.filter((manager) =>
      isNaN(manager.jurisdiction)
    );

    const supervisorsList = filteredManagers.map(
      (supervisor) =>
        `${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`
    );
    const sortedSupervisors = supervisorsList.sort();
    res.status(200).json(sortedSupervisors);
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR: Failed to fetch supervisors");
  }
});

/**
 * @typedef Submission
 * @property {string} firstName.required - First name of the user
 * @property {string} lastName.required - Last name of the user
 * @property {string} supervisor.required - Supervisor of the user
 * @property {string} email - Email of the user
 * @property {string} phoneNumber - Phone number of the user
 */

/**
 *
 * This function comment is parsed by doctrine
 * @route POST /submit
 * @param {Submission.model} submission.body.required - Submission data
 * @returns {string} 201 - SUCCESS: Form submitted
 * @returns {Error}  default - ERROR: Missing required fields
 */
router.post("/submit", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, supervisor } = req.body;
    console.log("POST BODY:\n")
    console.log({ firstName, lastName, email, phoneNumber, supervisor });
    if (!firstName || !lastName || !supervisor) throw "Missing required fields";
    res.status(201).send("SUCCESS: Form submitted");
    console.log("Form submitted!");
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR: " + error);
  }
});

module.exports = router;
