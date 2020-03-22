const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://queueme-dev.firebaseio.com"
});

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const Ticket = require("./src/Ticket");
const Location = require("./src/Location");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// TODO prevent CORS if necessary

const ticketApp = express();
ticketApp.use(cors({ origin: true }));
ticketApp.post("/", Ticket.create);
ticketApp.get("/:locationId", Ticket.getAll);
ticketApp.get("/:locationId/first", Ticket.getFirst);
ticketApp.delete("/:locationId", Ticket.deleteFirst);
ticketApp.post("/:locationId/emergency", Ticket.createEmergency);
exports.tickets = functions.https.onRequest(ticketApp);

const locationApp = express();
locationApp.use(cors({ origin: true }));
locationApp.post("/", Location.create);
locationApp.get("/search/:zip", Location.searchByZipCode);
exports.locations = functions.https.onRequest(locationApp);
