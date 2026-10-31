const { getUsers } = require('./store');

/** One line per active user, for the weekly email. */
function userReport() {
  return getUsers()
    .map((u) => `${u.name} <${u.email}>`)
    .join('\n');
}

module.exports = { userReport };
