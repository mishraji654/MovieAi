import axios from "axios";

const GROQ_API_KEY = "YourGroqAPIKeyHere";

export const askAI = async (message) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
You are MovieGPT.

Return ONLY valid JSON.

If user mentions a movie title or asks for movies like a movie:

{
  "type":"similar",
  "movies":[
    "Movie 1",
    "Movie 2",
    "Movie 3",
    "Movie 4",
    "Movie 5"
  ]
}

Examples:

User: Interstellar
{
  "type":"similar",
  "movies":[
    "Inception",
    "Arrival",
    "Contact",
    "Predestination",
    "The Prestige"
  ]
}

User: Kara
{
  "type":"movie",
  "title":"Kara"
}

If user asks for a genre:

{
  "type":"genre",
  "genre":"action"
}

Valid genres:
action
comedy
horror
romance
sci-fi

Return JSON only.
`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const content = response.data.choices[0].message.content;

    console.log("RAW AI =>", content);

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log("AI ERROR =>", error?.response?.data || error.message);

    return null;
  }
};
