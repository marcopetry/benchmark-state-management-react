#!/bin/bash
set -e

benchmark_type="both" # default
online_flag="false"

# Parse flags
for arg in "$@"; do
  case $arg in
    --online)
      online_flag="true"
      ;;
    playwright|lighthouse|both)
      benchmark_type="$arg"
      ;;
  esac
done

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

items_list=(10 100 1000)

total_acessos=5

libs_str=$(IFS=, ; echo "${libs[*]}")
items_str=$(IFS=, ; echo "${items_list[*]}")

run_container() {
  local tipo=$1
  local image=""
  local volume=""
  
  if [[ "$tipo" == "playwright" ]]; then
    image="benchmark-playwright"
    volume="$(pwd)/metrics-playwright:/app/metrics-playwright"
  elif [[ "$tipo" == "lighthouse" ]]; then
    image="benchmark-lighthouse"
    volume="$(pwd)/metrics-lighthouse:/app/metrics-lighthouse"
  else
    echo "❌ Tipo inválido: $tipo"
    exit 1
  fi
  
  echo "🚀 Iniciando container $tipo..."
  
  docker run --rm \
    --cpus="4" \
    --memory="8g" \
    --network="host" \
    -e LIBS="$libs_str" \
    -e ITEMS_LIST="$items_str" \
    -e TOTAL_ACESSOS="$total_acessos" \
    -e ONLINE="$online_flag" \
    -v "$volume" \
    "$image"
  
  echo "✅ Container $tipo finalizado."
}

if [[ "$benchmark_type" == "playwright" || "$benchmark_type" == "both" ]]; then
  run_container "playwright"
fi

if [[ "$benchmark_type" == "lighthouse" || "$benchmark_type" == "both" ]]; then
  run_container "lighthouse"
fi

echo "🏁 Todos os benchmarks finalizados."
