/**
* Handler that will be called during the execution of a PostUserRegistration flow.
*
* @param {Event} event - Details about the context and user that has registered.
* @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
*/
exports.onExecutePostUserRegistration = async (event, api) => {
  try {
    // Create management API client instance
    const ManagementClient = require("auth0").ManagementClient;

    const management = new ManagementClient({
      domain: event.secrets.DOMAIN,
      clientId: event.secrets.CLIENT_ID,
      clientSecret: event.secrets.CLIENT_SECRET,
    });

    // Assign "read:molds" permission to "Mold Inventory API"
    await management.users.assignPermissions(
      { id: event.user.user_id },
      {
        permissions: [
          {
            resource_server_identifier: "https://mold-inventory-app-production.epicpatka.workers.dev/api",
            permission_name: "read:molds"
          },
        ],
      }
    );
  } catch (e) {
    console.error("Error assigning permissions:", e);
  }
};
