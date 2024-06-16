// Replace YOUR_API_KEY with your actual API key
const API_KEY = 'AIzaSyBUpQqt5qqztEOnW-AQVMAEjINdiWKoWvU';

// Replace CALENDAR_ID with the actual Calendar ID
const CALENDAR_ID = 'lundberg.peter73@gmail.com';

async function getTodaysEvents() {
  // Get the current time in the calendar's timezone
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeMin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), +1, 0, 0, 0).toISOString();
  const timeMax = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, +1, 0, 0, -1).toISOString();

  // Set up the request URL
  const requestUrl = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMin=${timeMin}&timeMax=${timeMax}&timeZone=${timeZone}&key=${API_KEY}`;

  // Make the request
  const response = await fetch(requestUrl);
  const data = await response.json();

  // Print the events
  console.log(data.items);
}

getTodaysEvents();
