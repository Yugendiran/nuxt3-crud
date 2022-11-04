import connection from "../config/index.js";

export const getUsers = (req, res) => {
  connection.query("SELECT * FROM Users", (err, result) => {
    if (err) {
      return res.send("Error");
    }

    return res.json(result);
  });
};

export const createUser = (req, res) => {
  const user = req.body;
  connection.query("INSERT INTO Users SET ?", [user], (err, response) => {
    if (err) {
      console.error(err);
      return res.json({
        success: false,
      });
    }
    return res.json({
      success: true,
      response,
    });
  });
};

export const getUser = (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT * FROM Users WHERE userId = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.send("Error");
      }

      return res.json(result);
    }
  );
};

export const deleteUser = (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM Users WHERE userId = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          success: false,
        });
      }
      return res.json({
        success: true,
        result,
      });
    }
  );
};

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const values = req.body;

  connection.query(
    "UPDATE Users SET ? WHERE userId = ?",
    [values, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          success: false,
        });
      }
      return res.json({
        success: true,
        result,
      });
    }
  );
};
