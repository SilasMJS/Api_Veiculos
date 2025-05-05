from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from veiculos_routes import roteador_veiculos
from auth_routes import router as roteador_auth
from montadoras_routes import app as roteador_montadoras

app = FastAPI()

origins = ["http://127.0.0.1:5500"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Rotas de Veículos
app.include_router(roteador_veiculos)

# Rotas de Autenticaco
app.include_router(roteador_auth)

# Rotas de Montadas
app.include_router(roteador_montadoras)



