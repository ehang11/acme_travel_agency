const express = require("express");
const app = express();
const path = require("path");
const {
  syncAndSeed,
  models: { Traveler, Place, Trip },
} = require("./db");

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

//GET /api/clients
app.get("/travelers", async (req, res, next) => {
  try {
    const travelers = await Traveler.findAll({
      attributes: ["id", "name", "destination", "date", "purpose"],
    });
    res.json(travelers);
  } catch (error) {
    next(error);
  }
});

app.get("travelers/:id", async (req, res, next) => {
  try {
    res.send(await Traveler.findByPk(req.params.travelersId));
  } catch (error) {
    next(error);
  }
});
//GET /api/places
app.get("/places", async (req, res, next) => {
  try {
    const places = await Place.findAll({});
    res.send(places);
  } catch (error) {
    next(error);
  }
});
//GET /api/trips
app.get("/trips", async (req, res, next) => {
  try {
    const trips = await Trip.findAll();
    res.send(trips);
  } catch (error) {
    next(error);
  }
});

async function start() {
  try {
    await syncAndSeed();
    console.log(" @@@ database is synced! @@@");
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`listening on port ${port} 
http://localhost:${port}`)
    );
  } catch (error) {
    console.log("error listening to port");
  }
}

start();
