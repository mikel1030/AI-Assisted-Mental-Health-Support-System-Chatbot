'use strict';

const passwordReset = require('./passwordReset');

// Export all Cloud Functions
module.exports = {
  requestPasswordReset: passwordReset.requestPasswordReset,
  resetPassword: passwordReset.resetPassword,
  onAuthPasswordResetRequested: passwordReset.onAuthPasswordResetRequested
};
