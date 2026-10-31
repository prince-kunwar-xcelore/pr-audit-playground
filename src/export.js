const { getUsers } = require('./store');

/** Users as CSV for the CRM import. */
function exportUsersCsv() {
  const { users } = getUsers({ perPage: 1000, includeDeleted: true });
  const rows = users.map((u) => [u.id, u.name, u.email].join(','));
  return ['id,name,email', ...rows].join('\n');
}

module.exports = { exportUsersCsv };
