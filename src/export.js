const { getUsers } = require('./store');

/** RFC 4180: quote values containing commas, quotes or newlines, doubling embedded quotes. */
function csvField(value) {
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Users as CSV for the CRM import. */
function exportUsersCsv() {
  const { users } = getUsers({ perPage: 1000, includeDeleted: true });
  const rows = users.map((u) => [u.id, u.name, u.email].map(csvField).join(','));
  return ['id,name,email', ...rows].join('\n');
}

module.exports = { exportUsersCsv };
