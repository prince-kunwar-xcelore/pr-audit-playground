const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', deleted: false },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', deleted: true },
  { id: 3, name: 'Grace "Amazing" Hopper, RADM', email: 'grace@example.com', deleted: false },
];

/** A page of users, with the total count. */
function getUsers({ page = 1, perPage = 50, includeDeleted = false } = {}) {
  const list = includeDeleted ? users : users.filter((u) => !u.deleted);
  const start = (page - 1) * perPage;
  return { users: list.slice(start, start + perPage), total: list.length };
}

module.exports = { getUsers };
