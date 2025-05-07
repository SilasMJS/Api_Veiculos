from fastapi import APIRouter, HTTPException, status
from modelos import VeiculoCreate
from veiculos_dao import VeiculoDAO
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


roteador_veiculos = APIRouter()

veiculos_dao = VeiculoDAO()

roteador_veiculos.mount("/static",StaticFiles(directory="public"), name="static")

@roteador_veiculos.get("/")
async def index():
  return FileResponse("public/index.html")

@roteador_veiculos.post('/veiculos', status_code=status.HTTP_201_CREATED)
def veiculos_create(novo: VeiculoCreate):
  veiculo  = veiculos_dao.inserir(novo)

  return veiculo


@roteador_veiculos.get('/veiculos')
def veiculos_list(order: str = None, opc: str = None, opcao: str = None, valor: str | int = None):
  if opcao:
    veiculos = veiculos_dao.filtrar(opcao, valor) 
    return veiculos
  elif order:
    veiculos = veiculos_dao.ordenar(order, opc)
    return veiculos
  
  return veiculos_dao.todos()


@roteador_veiculos.get('/veiculos/{id}')
def veiculos_detail(id: int):
  veiculo = veiculos_dao.obter_por_id(id)
  

  if veiculo:
    return veiculo
  else:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f'Não existe um veículo com id = {id}'
    )
    
@roteador_veiculos.put('/veiculos/{id}')
def atualizar_veiculo(id:int, veiculo:VeiculoCreate):
  veiculo = veiculos_dao.atualizar(id,veiculo)
  
  return veiculo
    
  
@roteador_veiculos.delete('/veiculos/{id}',status_code=status.HTTP_204_NO_CONTENT)
def delete_veiculo(id:int):
  if veiculos_detail(id):
    veiculos_dao.remover_por_id(id)
  else:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f'Não existe um veículo com id = {id}'
    )
