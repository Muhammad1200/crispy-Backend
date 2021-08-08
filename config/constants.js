module.exports = {
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  PORT: process.env.PORT || 4000,
  googleURL: "https://maps.googleapis.com/maps/api/geocode/json",
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  VERIFICATION_CODE: process.env.VERIFICATION_CODE
};
