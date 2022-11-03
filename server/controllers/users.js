import { v4 as uuidv4 } from "uuid";
let users = [];

export const getUsers = (req, res) => {
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`User ${user.firstName} added`);
};

export const getUser = (req, res) => {
  const id = req.params.id;

  const found = users.find((user) => user.id == id);

  res.send(found);
};

export const deleteUser = (req, res) => {
  const id = req.params.id;

  users = users.filter((user) => user.id != id);

  res.send(users);
};

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id == userId);

  if (firstName) user.firstName = firstName;

  if (lastName) user.lastName = lastName;

  if (age) user.age = age;

  res.send(users);
};
