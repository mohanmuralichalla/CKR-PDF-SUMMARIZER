from fastapi import FastAPI
import requests
from PyPDF2 import PdfReader
from io import BytesIO
from langchain_community.llms import Ollama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
 
llm = Ollama(model="llama2")

app = FastAPI()


prompt = ChatPromptTemplate.from_messages([
    ("system", "You will summarize the following PDF"),
    ("user", "{input}")
])
output_parser = StrOutputParser()
chain = prompt | llm | output_parser


@app.get("/api/pdf_text")
async def get_pdf_text(url: str):
    response = requests.get(url)
    pdf = PdfReader(BytesIO(response.content))
    text = ""
    for page in range(len(pdf.pages)):
        text += pdf.pages[page].extract_text()
    return {"text": text}
 
import re

def remove_symbols(input_string: str) -> str:
    return re.sub(r'\W+', ' ', input_string)
@app.get("/api/ask_ollama")
async def ask_ollama(question: str, pdf_content: str):
    clean_pdf_content = remove_symbols(pdf_content)
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You will summarize the following PDF precisely."),
        ("user", clean_pdf_content),
        ("user", question)
    ])
    chain = prompt | llm | output_parser
    result = chain.invoke({})
    return {"result": result}