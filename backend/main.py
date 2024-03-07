from openai import AsyncOpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
aclient = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)


async def stream_generator(query: str):
    completion = await aclient.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": query}],
        stream=True
    )

    async for response in completion:
        content = response.choices[0].delta.content
        if content is not None:
            yield content


@app.get("/stream")
async def stream(query: str):
    return StreamingResponse(stream_generator(query), media_type='text/event-stream')
