# Attendance Fetching Bot for Fr. Conceicao Rodrigues College of Engineering

## Overview

This project is an automated attendance fetching bot designed specifically for Fr. Conceicao Rodrigues College of Engineering students. It allows users to query their attendance information through a WhatsApp interface by sending simple messages.

The bot scrapes attendance data from the college’s portal and responds with up-to-date attendance details.

---

## Features

- Fetches attendance data automatically by scraping the official portal.
- WhatsApp integration for easy, on-the-go attendance checking.
- Simple command interface (e.g., type `attendance` to receive your current attendance).
- Handles HTML parsing and data extraction reliably using `cheerio`.

---

## Setup and Installation Local

1. *Clone the repository:*

   ```bash
   git clone https://github.com/yourusername/attendance-fetching-bot.git
   cd attendance-fetching-bot
   ```

2. *Setup env*
    ```md
    username:
    dd:
    mm:
    yyyy:
    passwd:
    ```

3. *Expose port*
    ```bash
    npm run tunnel
    ```

2. *Setup twilio dashboard*

4. *Start server*
    ```bash
    npm start
    ```