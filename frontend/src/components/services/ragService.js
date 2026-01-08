// src/services/ragService.js

export async function askPolicyRAG(question) {
  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: question,
    }),
  });

  if (!response.ok) {
    throw new Error("RAG request failed");
  }

  const data = await response.json();

  // Expecting { answer: "..." }
  return data.answer || "No response from policy engine.";
}
