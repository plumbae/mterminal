  /**
   * Sample JavaScript code for calendar.events.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyBUpQqt5qqztEOnW-AQVMAEjINdiWKoWvU");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.calendar.events.list({
      "calendarId": "lundberg.peter73@gmail.com",
      "alwaysIncludeEmail": false,
      "maxResults": 10,
      "orderBy": "startTime",
      "showDeleted": false,
      "showHiddenInvitations": false,
      "singleEvents": true,
      "timeMax": "2022-12-30T23:59:00Z",
      "timeMin": "2022-12-26T00:00:00Z"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "969059389693-eo9bg05kiguk4ugasbjg9q63ogvi7sts.apps.googleusercontent.com", cookie_policy: 'none'});
  });

  // Get a reference to the output element
//   const outputEl = document.getElementById("output");

  // Insert the values into the output element
//   outputEl.innerHTML = `<p>Event: ${response.summary}</p>
                        // <p>Tid: ${response.timeZone}</p>
                        // <p>Plats: ${response.accessRole}</p>`;