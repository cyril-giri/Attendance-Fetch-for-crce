const express = require("express");
const { MessagingResponse } = require("twilio").twiml;
const { main } = require("./app");
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post("/whatsaap", async (req, res) => {
	const twiml = new MessagingResponse();
	try {
		const message = req.body.Body.trim().toLowerCase();
		// console.log(message);

		if (message.includes("attendance")) {
			const message = await main();
			// console.log(message);
			twiml.message(message);
		} else {
			twiml.message("Type < Attendance > to get attendance!");
		}
	} catch (e) {
		console.log(`error in post method: ${e.message}`);
		twiml.message("there was an error");
	}

	res.type("text/xml").send(twiml.toString());
    console.log("reponse sent!")
});

app.listen(PORT, "0.0.0.0", () =>
	console.log(`server running on port ${PORT}`)
);
