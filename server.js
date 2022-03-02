const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const shortid = require('shortid');
dotenv.config();
var AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });

AWS.config.getCredentials(function (err) {
	if (err) console.log(err.stack);
	// credentials not loaded
	else {
		console.log('Access key:', AWS.config.credentials.accessKeyId);
	}
});

const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
});

// create server instance
const port = process.env.PORT || 3000;
const app = express();
// Server settings
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);
	next();
});

async function addToWaitlist(email, phone, referrer) {
	try {
		// check if entry is present in the db

		phone = '+91' + phone;

		console.log(phone);

		let query =
			'select waitlist_spot, referral_code, verified,phone from users.user_signups where email = $1 or phone = $2; ';
		let res = await pool.query(query, [email, phone]);
		let otp = Math.floor(100000 + Math.random() * 900000);
		console.log(res.rows);
		console.log(res.rows.length);
		let status = false;

		if (res.rows.length == 0) {
			// Case when user have used platform for	 first time
			/* a unique referral code the user can share */
			let referral_code = shortid.generate();
			console.log(referral_code);
			await addNewUser(email, phone, referral_code, referrer, otp);
			await sendOtp(phone, otp);
			status = true;
			// res = await pool.query(query, [email]);
		} else {
			console.log('here');
			if (!res.rows[0].verified) {
				// Case when user is not verified
				let query2 = 'update users.user_signups set otp = $1 where phone = $2;';
				await pool.query(query2, [otp, res.rows[0].phone]);
				await sendOtp(res.rows[0].phone, otp);
				status = true;
			} else {
				// Case when user is already verified
				console.log('Verified');
				status = false;
			}
		}
		return status;
	} catch (e) {
		console.log(e);
	}
}

const sendOtp = async (phone, otp) => {
	try {
		var params = {
			Message: `Your OTP for JointNFT is ${otp}` /* required */,
			PhoneNumber: phone,
		};
		// Create promise and SNS service object
		var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
			.publish(params)
			.promise();
		// Handle promise's fulfilled/rejected states

		publishTextPromise
			.then(function (data) {
				console.log('MessageID is ' + data.MessageId);
			})
			.catch(function (err) {
				console.error(err, err.stack);
			});
	} catch (e) {
		console.log(e);
	}
};

async function addNewUser(email, phone, referral_code, referrer, otp) {
	try {
		/* add user to the database with INSERT */
		let query = 'call add_waitlist_entry ($1 , $2, $3, $4, $5) ;';
		let insert_order = await pool.query(query, [
			email,
			phone,
			referral_code,
			referrer,
			otp,
		]);
	} catch (e) {
		console.log(e);
	}
}

/* New POST route for form submissions */
app.post('/addToWaitlist', async function (req, res) {
	try {
		let email = req.body.email;
		let phone = req.body.phone;

		/* the referral code a user submitted (might be null) */
		let referrer = req.body.referrer;

		let status = await addToWaitlist(email, phone, referrer);

		// Status TRUE = OTP Sent
		// Status False = User already verified

		res.send({
			status,
		});
	} catch (e) {
		console.log(e);
	}
});

app.post('/otpVerify', async (req, res) => {
	try {
		let otp = req.body.otp;
		let phone = req.body.phone;
		phone = '+91' + phone;
		console.log(phone);
		let query =
			'select waitlist_spot, referrer, verified,phone,otp from users.user_signups where phone = $1; ';
		let response = await pool.query(query, [phone]);
		console.log(otp);
		console.log(response.rows[0].otp);
		if (response.rows[0].otp === otp) {
			let update = 'call otp_verify ($1 , $2) ;';
			await pool.query(update, [phone, response.rows[0].referrer]);
			res.json({
				status: true,
			});
		} else {
			console.log('Failed');
			res.json({
				status: false,
			});
		}
	} catch (e) {
		console.log(e);
	}
});

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`));
