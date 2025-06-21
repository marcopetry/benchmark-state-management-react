#!/bin/bash

# Lista de bibliotecas
libs=(
  "react-context-api"
  "zustand"
  "jotai"
  "valtio"
  "recoil"
  "effector"
  "redux-toolkit"
  "rematch"
  "hookstate"
  "use-context-selector"
  "constate"
)

# Quantidade de itens
items_list=(10 100 1000)

# Configuração dos testes
total_acessos=5
paralelo=5

# Tipo de benchmark (playwright, lighthouse ou ambos)
benchmark_type=${1:-both} # padrão: both

# Função para rodar o benchmark
rodar_benchmark() {
  local tipo="$1"
  local lib="$2"
  local items="$3"
  local image=""
  local volume=""

  if [ "$tipo" == "playwright" ]; then
    image="benchmark-playwright"
    volume="$(pwd)/metrics-playwright:/app/metrics-playwright"
  elif [ "$tipo" == "lighthouse" ]; then
    image="benchmark-lighthouse"
    volume="$(pwd)/metrics-lighthouse:/app/metrics-lighthouse"
  else
    echo "❌ Tipo inválido: $tipo"
    return 1
  fi

  echo "🚀 Iniciando [$tipo]: $lib com $items itens"

  docker run --rm \
    --cpus="4" \
    --memory="8g" \
    -e LIB_NAME="$lib" \
    -e ITEMS="$items" \
    -e TOTAL_ACESSOS="$total_acessos" \
    -e PARALELO="$paralelo" \
    -v "$volume" \
    "$image"

  echo "✅ Finalizado [$tipo]: $lib com $items itens"
}

# Loop por todas as libs e quantidades
for lib in "${libs[@]}"; do
  for items in "${items_list[@]}"; do
    if [[ "$benchmark_type" == "playwright" || "$benchmark_type" == "both" ]]; then
      rodar_benchmark "playwright" "$lib" "$items"
    fi

    if [[ "$benchmark_type" == "lighthouse" || "$benchmark_type" == "both" ]]; then
      rodar_benchmark "lighthouse" "$lib" "$items"
    fi
  done
done

echo "🏁 Todos os benchmarks foram concluídos."
