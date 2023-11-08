const db = require('./db'); // Import your database connection

const Patient = {};

Patient.getAll = () => {
  return db.promise().query('SELECT * FROM patients');
};

Patient.getById = (id) => {
  return db.promise().query('SELECT * FROM patients WHERE id = ?', [id]);
};

Patient.create = (patient) => {
  return db.promise().query('INSERT INTO patients (fullName, email, dateOfBirth, age, sex, city, country) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    patient.fullName,
    patient.email,
    patient.dateOfBirth,
    patient.age,
    patient.sex,
    patient.city,
    patient.country,
  ]);
};

Patient.update = (id, patient) => {
  return db.promise().query('UPDATE patients SET fullName = ?, email = ?, dateOfBirth = ?, age = ?, sex = ?, city = ?, country = ? WHERE id = ?', [
    patient.fullName,
    patient.email,
    patient.dateOfBirth,
    patient.age,
    patient.sex,
    patient.city,
    patient.country,
    id,
  ]);
};

Patient.delete = (id) => {
  return db.promise().query('DELETE FROM patients WHERE id = ?', [id]);
};

module.exports = Patient;
