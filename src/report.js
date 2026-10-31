const { getUsers } = require('./store');

/** One line per active user, for the weekly email. */
function userReport() {
  const lines = [];
  for (let page = 1; ; page++) {
    const { users, total } = getUsers({ page });
    lines.push(...users.map((u) => `${u.name} <${u.email}>`));
    if (users.length === 0 || page * 50 >= total) break;
  }
  return lines.join('\n');
}

module.exports = { userReport };
