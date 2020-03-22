const admin = require("firebase-admin");
const { uuid } = require("uuidv4");

let db = admin.firestore();

// TODO make tickets unique per email, so everybody can only have one ticket at one location per time
// TODO validate input data!
// eslint-disable-next-line consistent-return
exports.create = (req, res) => {
  /*
   Expected format:
    {
      "fullName": "a b",
      "phone": "12345",
      "note": "asdasd",
      "locationId": 2,
      "email": "a@b.de"
    }
   */
  let requestJson = JSON.parse(req.body);

  if (!requestJson.hasOwnProperty("email")) {
    res.status(400).json({ error: "Required parameter 'email' missing" });
  }
  if (!requestJson.hasOwnProperty("phone")) {
    res.status(400).json({ error: "Required parameter 'phone' missing" });
  }
  if (!requestJson.hasOwnProperty("fullName")) {
    res.status(400).json({ error: "Required parameter 'fullName' missing" });
  }
  if (!requestJson.hasOwnProperty("locationId")) {
    res.status(400).json({ error: "Required parameter 'locationId' missing" });
  }

  const locationId = requestJson.locationId;

  // TODO check that location exists before adding tickets to it... :)
  let ticketsRef = db
    .collection("locations")
    .doc(locationId.toString())
    .collection("tickets");

  let transaction = db
    .runTransaction(t => {
      return t.get(ticketsRef).then(snapshot => {
        let predecessor = null;
        let tickets = [];
        let lastTicket = null;

        snapshot.forEach(doc => {
          tickets.push(doc.data());
        });

        if (tickets.length === 0) {
          predecessor = null;
        } else if (tickets.length === 1) {
          predecessor = tickets[0]["id"];
        } else if (tickets.length > 1) {
          ticketsCopy = [...tickets];

          tickets.forEach(ticket => {
            if (!lastTicket) {
              if (
                tickets.filter(item => item.predecessor === ticket.id)
                  .length === 0
              ) {
                lastTicket = ticket;
              }
            }
          });
          predecessor = lastTicket.id;
        }

        const ticketId = uuid();
        let ticketRef = db
          .collection("locations")
          .doc(locationId.toString())
          .collection("tickets")
          .doc(ticketId);

        let setDoc = t.set(ticketRef, {
          ...requestJson,
          id: ticketId,
          predecessor
        });

        return res.status(200).json({ status: "success" });
      });
    })
    .catch(err => {
      return res.status(500).json({ error: `an error occured: ${err}` });
    });
};

// TODO add input validation
// eslint-disable-next-line consistent-return
exports.deleteFirst = (req, res) => {
  const locationId = req.param("locationId");

  if (!locationId) {
    return res
      .status(400)
      .json({ error: "Required parameter 'locationId' missing" });
  }

  let ticketsRef = db
    .collection("locations")
    .doc(locationId.toString())
    .collection("tickets");

  let ticketQueryRef = ticketsRef.where("predecessor", "==", null);

  let transaction = db
    .runTransaction(t => {
      // eslint-disable-next-line consistent-return
      return t.get(ticketQueryRef).then(async snapshot => {
        let tickets = [];

        snapshot.forEach(doc => {
          tickets.push(doc.data());
        });

        // eslint-disable-next-line promise/always-return
        if (tickets.length > 1) {
          throw new Error("Only one item at first slot is allowed...");
        } else if (tickets.length === 1) {
          const firstTicket = tickets[0];
          let secondTicket = null;

          // eslint-disable-next-line promise/no-nesting
          await t
            .get(ticketsRef.where("predecessor", "==", firstTicket.id))
            .then(secondSnapshot => {
              tickets2 = [];
              secondSnapshot.forEach(doc => {
                tickets2.push(doc.data());
              });
              // eslint-disable-next-line promise/always-return
              if (tickets2.length > 1) {
                throw new Error("Only one item at first slot is allowed...");
              } else {
                console.log(firstTicket);
                t.delete(ticketsRef.doc(firstTicket.id));

                if (tickets2.length > 0) {
                  secondTicket = tickets2[0];
                  t.update(ticketsRef.doc(secondTicket.id), {
                    predecessor: null
                  });
                }
                return res.status(200).json({ status: "success" });
              }
            })
            .catch(err => {
              // return new Promise();
              return res
                .status(500)
                .json({ error: `an error occured: ${err}` });
            });
        } else {
          return res.status(200).json({ status: "success" });
        }
      });
    })
    .catch(err => {
      return res.status(500).json({ error: `an error occured: ${err}` });
    });
  // return res.status(200).json({ status: "1success" });
};

// TODO add input validation
exports.getAll = (req, res) => {
  const locationId = req.param("locationId");

  if (!locationId) {
    res.status(400).json({ error: "Required parameter 'locationId' missing" });
  }

  let ticketsRef = db
    .collection("locations")
    .doc(locationId.toString())
    .collection("tickets");

  ticketsRef
    .get()
    .then(snapshot => {
      let result = [];
      snapshot.forEach(doc => {
        result.push(doc.data());
      });

      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).json({ error: `an error occured: ${err}` });
    });
};

exports.getFirst = (req, res) => {
  const locationId = req.param("locationId");

  if (!locationId) {
    res.status(400).json({ error: "Required parameter 'locationId' missing" });
  }

  let ticketsRef = db
    .collection("locations")
    .doc(locationId)
    .collection("tickets")
    .where("predecessor", "==", null);

  ticketsRef
    .get()
    .then(snapshot => {
      let result = [];
      snapshot.forEach(doc => {
        result.push(doc.data());
      });

      if (result.length > 1) {
        throw new Error("There where more results than expected...");
      }

      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).json({ error: `an error occured: ${err}` });
    });
};

// eslint-disable-next-line consistent-return
exports.createEmergency = (req, res) => {
  const locationId = req.param("locationId");

  if (!locationId) {
    return res
      .status(400)
      .json({ error: "Required parameter 'locationId' missing" });
  }

  let ticketsRef = db
    .collection("locations")
    .doc(locationId.toString())
    .collection("tickets");

  let ticketQueryRef = ticketsRef.where("predecessor", "==", null);

  let transaction = db.runTransaction(t => {
    return t
      .get(ticketQueryRef)
        // eslint-disable-next-line consistent-return
      .then(async snapshot => {
        let tickets = [];

        snapshot.forEach(doc => {
          tickets.push(doc.data());
        });

        // eslint-disable-next-line promise/always-return
        if (tickets.length > 1) {
          throw new Error("Only one item at first slot is allowed...");
        } else if (tickets.length === 1) {
          const firstTicket = tickets[0];

          const newId = uuid();

          await t.set(ticketsRef.doc(newId), {
            fullName: "EMERGENCY",
            id: newId,
            phone: "",
            note: "",
            locationId,
            email: "",
            predecessor: null
          });

          await t.update(ticketsRef.doc(firstTicket.id), {
            predecessor: newId
          });

          return res.status(200).json({ status: "success" });
        }
      })
      .catch(err => {
        return res.status(500).json({ error: `an error occured: ${err}` });
      });
  });
};
