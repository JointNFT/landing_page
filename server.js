var https = require("https");
var fs = require("fs");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const shortid = require("shortid");
dotenv.config();

// create server instance
const port = process.env.PORT || 3000;
const app = express();
// Server settings
app.use(express.static(path.join(__dirname, "/dist")));
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  next();
});

async function addToWaitlist(email, phone, referral_code, referrer) {
  // check if entry is present in the db
  let query = "select waitlist_spot, referral_code from users.user_signups where email = $1 or phone = $2; ";
  let res = await pool.query(query, [email, phone]);

  if (res.rows.length == 0) {
    // user is already in waitlist
    await addNewUser(email, phone, referral_code, referrer);
    res = await pool.query(query, [email, phone]);
  }
  return res.rows[0];
}

async function addNewUser(email, phone, referral_code, referrer) {
  /* add user to the database with INSERT */
  let query = "call add_waitlist_entry ($1 , $2, $3, $4) ;";
  let insert_order = await pool.query(query, [email, phone, referral_code, referrer]);
}

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

/* New POST route for form submissions */
app.post("/addToWaitlist", async function (req, res) {
  let email = req.body.email;
  let phone = req.body.phone;

  /* a unique referral code the user can share */
  let referral_code = shortid.generate();

  /* the referral code a user submitted (might be null) */
  let referrer = req.body.referrer;

  let user_entry = await addToWaitlist(email, phone, referral_code, referrer);

  res.send({
    referral_code: user_entry.referral_code,
    waitlist_spot: user_entry.waitlist_spot,
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
