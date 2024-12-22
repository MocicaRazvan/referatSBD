import express from "express";
import dotenv from "dotenv";

import childProcess from "child_process";

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// run in bash the app (git bash)
// {
//   "url": "example.com && echo $SUPER_SECRET_KEY"

// }

app.post("/logEnv", (req, res) => {
  console.log(req.body);
  const { url } = req.body;
  if (!url) {
    return res
      .status(400)
      .json({ error: "URL is required in the request body" });
  }

  const cmd = childProcess.exec(`sh -c "curl ${url}"`);

  let output = "";

  cmd.stdout.on("data", (data) => {
    output += data;
    console.log(data);
  });

  cmd.stderr.on("data", (data) => {
    output += data;
    console.error(data);
  });

  cmd.on("close", (code) => {
    console.log(`Command exited with code ${code}`);
    res.json({
      output: output.trim(),
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
