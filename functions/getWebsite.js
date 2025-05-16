const axios = require("axios");

async function getWebsite(cookie) {
	try {
		const url =
			"https://crce-students.contineo.in/parents/index.php?option=com_studentdashboard&controller=studentdashboard&task=dashboard";

		const headers = {
			Cookie: cookie, // Set the cookie header from the function parameter
		};

		const response = await axios.get(url, { headers: headers });
		// console.log(response.data)
		return response.data;
	} catch (e) {
		console.log(`error in getting website ${e.message}`);
		return {};
	}
}

module.exports = { getWebsite };
