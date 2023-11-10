'use strict';

import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

console.log(process.env);

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Google Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret
  process.env.GOOGLE_REDIRECT_CALLBACK // Your redirect URL
);

// Scopes to request access to Google Calendar
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const service = {
    getGoogleAuthURL() {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        return authUrl;
    },
    async getGoogleAccountFromCode(code) {
        console.log({
            code,
        })
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Retrieve user information or other tasks using the googleapis library
        // For example, getting the user's email/calendar data.

        // Return whatever you need for your application, e.g. tokens, google profile data, etc.
        return { tokens };
    },
};

export default service;
