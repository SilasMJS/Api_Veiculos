# Use uma imagem base do Python com a versão desejada que já tenha o FastAPI CLI instalado
# Uma opção é usar uma imagem que já inclua ferramentas de desenvolvimento Python
FROM python:3.11-slim-buster

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /home/app

# Copie os arquivos de requirements para o contêiner
COPY requirements.txt .

# Copie o código da sua aplicação para o contêiner
COPY . .

# Instale as dependências do Python, incluindo o FastAPI CLI
RUN pip install --no-cache-dir -r requirements.txt

# Exponha a porta em que sua aplicação FastAPI estará rodando (geralmente 8000)
EXPOSE 8000

# Comando para executar sua aplicação FastAPI usando FastAPI CLI
CMD ["fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "8000"]