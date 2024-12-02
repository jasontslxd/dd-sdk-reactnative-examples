FROM python:3.11-slim
WORKDIR /app

COPY requirements.txt ./
RUN pip install -r ./requirements.txt
RUN opentelemetry-bootstrap -a install
COPY . .

EXPOSE 4000
