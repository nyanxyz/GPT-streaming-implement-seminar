# ChatGPT streaming 구현하기

- 제 1회 SLConf에서 'ChatGPT streaming 구현하기'를 주제로 발표했습니다. (2024.01.13)
- Transformer 구조, 스트리밍에 사용되는 네트워크 프로토콜, FastAPI를 사용한 서버 구현, React를 사용한 프론트엔드 구현에 대해 설명했습니다.

## 발표 자료

- [발표 자료](https://github.com/nyanxyz/GPT-streaming-implement-seminar/blob/main/ChatGPT%20streaming%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0.pdf)

## Getting Started

### backend

```bash
cd backend
pip install -r requirements.txt
export OPENAI_API_KEY=YOUR_API_KEY
uvicorn main:app --reload
```

### frontend

```bash
cd frontend
yarn
yarn dev
```
