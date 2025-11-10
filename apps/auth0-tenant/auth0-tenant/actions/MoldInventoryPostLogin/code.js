/** @import {Event, PostLoginAPI} from "@auth0/actions/post-login/v3" */

/**
* Handler that will be called during the execution of a PostLogin flow.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
exports.onExecutePostLogin = async (event, api) => {
  if (event.stats.logins_count === 1) {
    // This code block will execute only on the user's first login after registration.
    // New users get read-only access to molds
    // Subsequent logins will rely on Mold Inventory API scopes for the user
    api.accessToken.addScope("read:molds");
  }
};

/**
* Handler that will be invoked when this action is resuming after an external redirect. If your
* onExecutePostLogin function does not perform a redirect, this function can be safely ignored.
*
* @param {Event} event - Details about the user and the context in which they are logging in.
* @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
*/
// exports.onContinuePostLogin = async (event, api) => {
// };
