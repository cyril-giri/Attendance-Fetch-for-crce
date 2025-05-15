const axios = require("axios");
const qs = require("qs");
const env = require("dotenv");
const { getCookies } = require("./getCookie");

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

const cookie = getCookies(data)

console.log("my cookie" + cookie)

async function main() {
    
}