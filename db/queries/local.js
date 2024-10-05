const getPDFContent = async (url) => {
  const res = await fetch(`/api/pdf_text?url=${url}`);
  const data = await res.json();
  return data.text;
};

const askOllama = async (question, pdf_content) => {
  const response = await fetch(
    `/api/ask_ollama?question=${question}&pdf_content=${pdf_content}`
  );
  const data = await response.json();
  return data.result;
};

export { getPDFContent, askOllama };
