//utility function for sending a response
const sendResponse = ({ res, status, message, data, ...rest }) => {
	res.status(status).json({ status, message, data, ...rest });
};

export const getDrivers = async (req, res) => {
	const db = req.app.locals.client.db("VanHaul");

	const drivers = await db
		.collection("users")
		.find({ role: "driver" })
		.toArray();
	try {
		sendResponse({
			res,
			status: 200,
			data: drivers,
			message: "Drivers found",
		});
	} catch (err) {
		sendResponse({ res, status: 500, message: err.message });
	}
};

export const getShipperReceiver = async (req, res) => {
	const db = req.app.locals.client.db("VanHaul");
	try {
		const shipperReceiver = await db
			.collection("users")
			.find({ role: "shipper-receiver" })
			.toArray();
		sendResponse({
			res,
			status: 200,
			data: shipperReceiver,
			message: "Shippier-Receiver found",
		});
	} catch (err) {
		sendResponse({ res, status: 500, message: err.message });
	}
};

export const createUser = async (req, res) => {
	const db = req.app.locals.client.db("VanHaul");
	try {
		const { fullName, email, image, role } = req.body;
		const _id = uuidv4();
		const userInfo = {
			_id,
			fullName,
			email,
			image,
			role,
		};
		const existingUser = await db
			.collection("users")
			.findOne({ email: req.body.email });

		if (existingUser === null) {
			await db.collection("users").insertOne(userInfo);
			sendResponse({ res, status: 200, message: "user added to db" });
		} else {
			sendResponse({ res, status: 300, message: "user already exists" });
		}
	} catch (err) {
		sendResponse({ res, status: 400, message: err.message });
	}
};

export const findAllUsers = async (req, res) => {
	const db = req.app.locals.client.db("VanHaul");
	try {
		const users = await db.collection("users").find().toArray();

		sendResponse({
			res,
			status: 200,
			data: users,
			message: "Users Found!",
		});
	} catch (err) {
		sendResponse({ res, status: 400, message: err.message });
	}
};

export const findAUser = async (req, res) => {
	const db = req.app.locals.client.db("VanHaul");
	const email = req.params.email;
	try {
		const user = await db.collection("users").findOne({ email });

		// insert user if doesnt exists

		sendResponse({
			res,
			status: 200,
			data: user,
			message: "User itendified by e-mail address!",
		});
	} catch (err) {
		sendResponse({ res, status: 400, message: err.message });
	}
};

export const addUserRole = async (req, res) => {
	const db = req.app.locals.client.db("VanHaul");
	const { email, role } = req.body;

	try {
		const user = await db.collection("users").findOne({ email });

		if (!user || user.role) {
			sendResponse({ res, status: 400, message: "Invalid User" });
			return;
		}

		await db.collection("users").updateOne(
			{ email },
			{
				$set: {
					role,
				},
			}
		);

		sendResponse({ res, status: 200, message: "Added user role to db" });
	} catch (err) {
		sendResponse({ res, status: 500, message: "Internal Server Error" });
	}
};
