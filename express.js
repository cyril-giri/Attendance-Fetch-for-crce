const express = require("express");
const { MessagingResponse } = require("twilio").twiml;
const { main } = require("./app");
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));

app.post("/whatsaap", async (req, res) => {
	const message = req.body.Body.trim().toLowerCase();
	console.log(message);

	const twiml = new MessagingResponse();

	if (message.includes("attendance")) {
		const message = await main();
		console.log(message);
		twiml.message(message);
	} else {
		twiml.message("Type < Attendance > to get attendance!");
	}
	res.type("text/xml").send(twiml.toString());
	return;
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
