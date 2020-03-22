const admin = require("firebase-admin");
const { uuid } = require("uuidv4");

let db = admin.firestore();

// TODO replace search with actual search service like Algoli
// TODO add input validation

// dont use following function! should be filtered in the frontend!
// exports.searchByText = (req, res) => {
//   query = req.param("q");
//
//   let locationsRef = db.collection("locations");
//
//   locationsRef
//     .get()
//     .then(snapshot => {
//       let result = [];
//
//       snapshot.forEach(doc => {
//         let dat = doc.data();
//         if (
//           dat.name.search(new RegExp(`/${q}/gi`)) !== -1 ||
//           dat.address.search(new RegExp(`/${q}/gi`)) !== -1 ||
//           dat.type.search(new RegExp(`/${q}/gi`)) !== -1
//         ) {
//           result.push(doc.data());
//         }
//
//         return res.status(200).json(result);
//       });
//     })
//     .catch(err => {
//       return res.status(500).json({ error: `an error occured: ${err}` });
//     });
// };

exports.searchByZipCode = (req, res) => {
  const zip = req.param("zip");

  let locationsRef = db.collection("locations");

  locationsRef
    .get()
    .then(snapshot => {
      let result = [];

      snapshot.forEach(doc => {
        let dat = doc.data();
        console.log(dat);
        if (dat.zip.search(zip) !== -1) {
          result.push(doc.data());
        }
      });
      return res.status(200).json(result);
    })
    .catch(err => {
      return res.status(500).json({ error: `an error occured: ${err}` });
    });
};

// TODO validate input data!
// TODO add authentication registration (what about password etc.)
exports.create = (req, res) => {
  const allowedFields = [
    "salutation",
    "title",
    "firstName",
    "lastName",
    "locationName",
    "phone",
    "description",
    "street",
    "street_no",
    "zip"
  ];
  const requestJson = JSON.parse(req.body);

  /*
    {
        "salutation": "...",
        "title": "...",
        "firstName": "",
        "lastName": "",
        "locationName": "",
        "phone": "",
        "street": "",
        "street_no": "",
        "zip": "",
        "email": ""
        }
     */

  let data = {};
  allowedFields.forEach(field => {
    if (requestJson.hasOwnProperty(field)) {
      data[field] = requestJson[field];
    }
  });
  const newId = uuid();
  db.collection("locations")
    .doc(newId)
    .set({
      ...data,
      id: newId
    })
    .catch(err => {
      return res.status(500).json({ error: `an error occured: ${err}` });
    });

  return res
    .status(200)
    .json({ status: "success", data: { locationId: newId } });
};
