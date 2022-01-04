const Sequelize = require("sequelize");
const conn = new Sequelize("postgres://localhost/winter_travel_agency", {});
const { STRING, DATEONLY, ENUM, UUID, UUIDV4 } = Sequelize.DataTypes;

const Traveler = conn.define("travelers", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "A name is required" },
    },
  },
  destination: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "A destination is required" },
    },
  },
  date: {
    type: DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: "A valid date is required",
      },
    },
  },

  purpose: {
    type: ENUM("business", "pleasure", "other"),
    allowNull: true,
  },
});

const Place = conn.define("places", {
  location: {
    type: STRING,
    allowNull: false,
  },
});

const Trip = conn.define("trips", {
  location: {
    type: STRING,
    allowNull: false,
  },
  departure: {
    type: DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: "A valid date is required",
      },
    },
  },
  arrival: {
    type: DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: "A valid date is required",
      },
    },
  },
});

//assocations

//sync and seed
const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

    await Traveler.create({
      name: "Eric Hang",
      destination: "Jamaica",
      date: 04 / 11 / 2022,
      purpose: "pleasure",
    });

    await Place.create({
      location: "Jamaica",
    });

    await Trip.create({
      location: "Jamaica",
      departure: 04 / 11 / 2022,
      arrival: 04 / 15 / 2022,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  conn,
  syncAndSeed,
  models: { Traveler, Place, Trip },
};
