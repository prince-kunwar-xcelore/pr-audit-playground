const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', deleted: false },
  { id: 2, name: 'Alan Turing', email: 'alan@example.com', deleted: true },
  { id: 3, name: 'Grace "Amazing" Hopper, RADM', email: 'grace@example.com', deleted: false },
];

/** Active (non-deleted) users. */
function getUsers() {
  return users.filter((u) => !u.deleted);
}

module.exports = { getUsers };
