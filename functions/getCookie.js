const axios = require("axios");

function trimAt(string, symbol) {
	const index = string.indexOf(symbol);
	if (index !== -1) {
		return string.substring(0, index);
	} else return string;
}

async function getCookies(data) {
	const url = "https://crce-students.contineo.in/parents/index.php";

	const header = {
		headers: {
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			"Accept-Language": "en-US,en;q=0.9",
			"Cache-Control": "max-age=0",
			Connection: "keep-alive",
			"Content-Type": "application/x-www-form-urlencoded",
			DNT: "1",
			Origin: "https://crce-students.contineo.in",
			Referer:
				"https://crce-students.contineo.in/parents/index.php?option=com_studentdashboard&controller=studentdashboard&task=dashboard",
			"Sec-Fetch-Dest": "document",
			"Sec-Fetch-Mode": "navigate",
			"Sec-Fetch-Site": "same-origin",
			"Sec-Fetch-User": "?1",
			"Upgrade-Insecure-Requests": "1",
			"User-Agent":
				"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
			"sec-ch-ua":
				'"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"macOS"',
			// 'Cookie': '5bd4aa82278a9392700cda732bf3f9eb=926cd64b8219cfd0c1d15dc7541f14a6'
		},
		maxRedirects: 0,
		validateStatus: null, // allow 303 response through
	};

	try {
		const response = await axios.post(url, data, header);

		const unformattedCookie = response.headers["set-cookie"][0];

		const cookie = trimAt(unformattedCookie, ";");
		// console.log(cookie);

		return cookie;
	} catch (error) {
        console.log(`error while getting cookie ${error}`)
    }
}

module.exports = { getCookies };
