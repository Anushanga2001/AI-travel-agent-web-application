const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // For handling form data
const cors = require("cors"); // For handling cross-origin requests
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Database connection (if applicable)

app.use(bodyParser.json()); // Parse JSON data from requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(cors());

// app.post('/generate', async (req, res) => {
//       const textInput = req.body.textInput; // Access text input from request body

//       // Handle image data (if applicable)
//       // **Option 1: Using Multer for multipart form data (image + text)**
//       // if (req.file) {
//       //     const imageData = req.file.buffer;
//       //     // Process image data (e.g., extract features, convert to format suitable for AI)
//       // }

//       // **Option 2: Handling image data separately (if image is sent as a URL)**
//       // const imageUrl = req.body.imageUrl; // Access image URL from request body
//       // // Fetch image data from URL and process it

//       // **Alternative AI Integration (if using a different solution):**
//       // Replace the following code with your chosen AI library's integration logic
//       const aiResponse = await processUserInputWithAI(textInput); // Replace with your AI call
//       res.json({ aiResponse }); // Send AI response back to frontend
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error processing input' });
//   }
// });

// app.post('/api/generate', async (req, res) => {
//   try {
//     const gen = req.body.genInput; // Access text input from request body
//     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//     const result = await model.generateContent(gen);
//     const response = await result.response;
//     const text = response.text();
//     res.json({ text }); // Send AI response back to frontend
//     // res.json({ response });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error processing input123' });
//   }
// }
// )

// app.post('/api/generate', async (req, res) => {
//   console.log(req.body.history)
//   console.log(req.body.message)
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//   const chat = model.startChat(
//     {
//       history: req.body.history,
//     })
//     const msg = req.body.message;
//     const result = await chat.sendMessage(msg);
//     const response = await result.response;
//     const text = response.text();
//     res.json({ text });
// })/   try {


app.post("/api/generateRoute", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = req.body.message;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log(text);
    // console.log(result.response.text());

    res.json({ text });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the response." });
  }
});

app.post("/api/generate", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: req.body.history,
    });
    const msg = req.body.message;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the response." });
  }
});

app.listen(8000, () => console.log("Server listening on port 8000"));
