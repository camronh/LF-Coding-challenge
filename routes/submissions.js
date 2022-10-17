const express = require("express");
const router = express.Router();
const axios = require("axios");

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

    // Sort using localCompare from https://www.benmvp.com/blog/quick-way-sort-javascript-array-multiple-fields/
    const sortedManagers = filteredManagers.sort(
      (a, b) =>
        a.jurisdiction.localeCompare(b.jurisdiction) ||
        a.lastName.localeCompare(b.lastName) ||
        a.firstName.localeCompare(b.firstName)
    );
    const supervisorsList = sortedManagers.map(
      (supervisor) =>
        `${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`
    );
    res.status(200).json(supervisorsList);
  } catch (error) {
    console.log(error);
    res.status(500).send("ERROR: Failed to fetch supervisors");
  }
});

router.post("/submit", async (req, res) => {
  try {
    console.log("REQUEST BODY:\n", req.body);
    const { firstName, lastName, email, phoneNumber, supervisor } = req.body;
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
