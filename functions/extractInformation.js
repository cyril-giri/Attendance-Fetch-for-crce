const cheerio = require("cheerio");

function extractAttendance(htmlString) {
	const $ = cheerio.load(htmlString);
	const scripts = $("script");
	let attendanceDataColumns = null;

	// Regex to find the 'columns' array.
	// It captures the content *inside* the main brackets of the 'columns' array.
	// This assumes the 'columns' property is followed by a 'type' property in the data object.
	const regex = /columns:\s*\[\s*([\s\S]*?)\s*\]\s*,\s*type:\s*"gauge"/;
	//                        ^^^^^^^^^^^^^^^^^ match[1]: captures the content inside the brackets

	scripts.each((index, element) => {
		const scriptText = $(element).html();

		// First, ensure we are looking at the correct script block
		if (scriptText && scriptText.includes('bindto: "#gaugeTypeMulti"')) {
			const match = scriptText.match(regex);

			if (match && typeof match[1] === "string") {
				// match[1] is the string content *inside* the columns array's brackets
				// e.g., " [\"ACSC601\",76],[\"ACSC602\",83], ... ,[\"CSDLO6013\",76],  "
				const arrayInternalsString = match[1];

				// We need to reconstruct the full array string for parsing
				const arrayStringToParse = "[" + arrayInternalsString + "]";

				try {
					// Using Function constructor for leniency (e.g., handles trailing commas within arrayInternalsString)
					attendanceDataColumns = new Function(
						"return " + arrayStringToParse
					)();
					return false; // Exit the .each loop since we found and parsed it
				} catch (e) {
					console.error(
						"Error parsing columns data with Function constructor:",
						e
					);
					console.warn(
						"Problematic array string for Function constructor (after wrapping):",
						arrayStringToParse
					);

					// Fallback: try to clean for JSON.parse
					// JSON.parse is stricter and doesn't allow trailing commas like [el1, el2,]
					// This regex removes a trailing comma if it's right before the final ']'
					const cleanedArrayStringToParse = arrayStringToParse.replace(
						/,\s*\]$/,
						"]"
					);
					try {
						attendanceDataColumns = JSON.parse(cleanedArrayStringToParse);
						return false; // Exit the .each loop
					} catch (e2) {
						console.error(
							"Error parsing columns data with JSON.parse after cleaning:",
							e2
						);
						console.warn(
							"String that failed JSON.parse:",
							cleanedArrayStringToParse
						);
					}
				}
			}
		}
	});

	return attendanceDataColumns;
}

function extractCourseMap(htmlString) {
	const $ = cheerio.load(htmlString);
	const courseMap = {};

	// Find the table by its caption
	// Then navigate to the tbody and iterate over its rows
	$('caption:contains("Course registration - CIE and attendance status")')
		.closest("table") // Get the parent table of the caption
		.find("tbody tr") // Find all 'tr' elements within the 'tbody'
		.each((index, rowElement) => {
			const cells = $(rowElement).find("td"); // Get all 'td' elements in the current row

			if (cells.length >= 2) {
				// Ensure there are at least two cells
				const courseCode = $(cells[0]).text().trim(); // Text of the first cell
				const courseName = $(cells[1]).text().trim(); // Text of the second cell

				if (courseCode && courseName) {
					// Make sure both are not empty
					courseMap[courseCode] = courseName;
				}
			}
		});

	return courseMap;
}

function extractTitle(htmlString) {
	const $ = cheerio.load(htmlString);
	const title = $(
		"div.cn-student-header.cn-grey-bg div.cn-stu-data1.uk-text-right.cn-mobile-text p"
	)
		.first()
		.text()
		.trim();

	const lastUpdate = $("p.uk-text-right.cn-last-update").first().text().trim();
	return {
		title: title,
		lastUpdate: lastUpdate,
	};

}
module.exports = { extractAttendance, extractCourseMap, extractTitle };
