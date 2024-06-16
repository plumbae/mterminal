const AthomCloudAPI = require('homey-api/lib/AthomCloudAPI');

async function main() {
  // Create a Cloud API instance
  const cloudApi = new AthomCloudAPI({
    clientId: '...',
    clientSecret: '...',
  });

  // Get the logged-in user
  const user = await cloudApi.getAuthenticatedUser();

  // Get the first Homey of the logged-in user
  const homey = await user.getFirstHomey();

  // Create a session on this Homey
  const homeyApi = await homey.authenticate();

  // Loop all devices
  const devices = await homeyApi.devices.getDevices();
  for (const device of Object.values(devices)) {
    // Turn device on
    await device.setCapabilityValue({ capabilityId: 'onoff', value: true });
  }
}

main().catch(console.error);
