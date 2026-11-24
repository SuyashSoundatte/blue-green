const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [];

app.get("/users", async (req, res) => {
  try {
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/ping", async (req, res) => {
  return res.status(200).json({ success: true, message: "pong" });
})

app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "name and email are required" });
    }

    const user = { id: users.length + 1, name, email };
    users.push(user);

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
