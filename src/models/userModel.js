const db = require('./db'); // Import your database connection

const User = {};

User.getAll = () => {
  return db.promise().query('SELECT * FROM users');
};

User.getById = (id) => {
  return db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
};

User.create = (user) => {
  return db.promise().query('INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)', [
    user.fullName,
    user.email,
    user.password,
  ]);
};

User.update = (id, user) => {
  return db.promise().query('UPDATE users SET fullName = ?, email = ?, password = ? WHERE id = ?', [
    user.fullName,
    user.email,
    user.password,
    id,
  ]);
};

User.delete = (id) => {
  return db.promise().query('DELETE FROM users WHERE id = ?', [id]);
};

module.exports = User;
