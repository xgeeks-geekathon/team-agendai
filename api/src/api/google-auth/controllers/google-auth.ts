import GoogleAuthService from '../services/google-auth';

module.exports = {
  /**
   * Redirects users to the Google Authorization screen
   */
  async connect(ctx) {
    console.log(ctx)
    ctx.redirect(GoogleAuthService.getGoogleAuthURL());
  },

  /**
   * Callback endpoint for handling the OAuth2 callback and token exchange
   */
  async callback(ctx) {
    console.log(ctx)
    const { code } = ctx.query;
    try {
      const data = await GoogleAuthService.getGoogleAccountFromCode(code);

      // Handle sign-in, user creation, etc. with the returned data
      // For example, you could sign in the user, attach data to their account, etc.

      // Redirect user or send the data back to the frontend
      ctx.body = data;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { message: 'Error while exchanging token.', error };
    }
  }
};
