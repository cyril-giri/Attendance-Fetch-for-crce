const axios = require("axios");
const qs = require("qs");
const env = require("dotenv");
const { getCookies } = require("./functions/getCookie");
const { getWebsite } = require("./functions/getWebsite");
const { extractAttendance, extractCourseMap, extractTitle } = require("./functions/extractInformation");
const { formatAttendanceForWhatsApp } = require("./functions/formatMessage");

env.config()


const data = qs.stringify({
	username: process.env.username,
	dd: process.env.dd,
	mm: process.env.mm,
	yyyy: process.env.yyyy,
	passwd: process.env.passwd,
	option: "com_user",
	task: "login",
	return: "�w^Æ˜i",
	"return:": "",
	"0b9ce0ae5b5dfe9df30a4778f4395944": "1",
	"captcha-response": "",
});



async function main() {
    const cookie = await getCookies(data)
    // console.log("my cookie" + cookie)
    
    const websiteHTML = await getWebsite(cookie)
    // console.log(typeof(websiteHTML))

    const attendanceData = extractAttendance(websiteHTML)
    // console.log(attendanceData)

    const courseNameMap = extractCourseMap(websiteHTML);
    // console.log(courseNameMap)

    const title = extractTitle(websiteHTML)
    // console.log(title)
    
    const message = formatAttendanceForWhatsApp(attendanceData, courseNameMap, title)
    // console.log(message)
    return message
}

module.exports = {main}