#!/bin/bash
set -e

image="benchmark-lighthouse"
volume="$(pwd)/metrics-lighthouse:/app/metrics-lighthouse"

online_flag="false"
total_acessos="2" # valor padrão

# Parse flags
for arg in "$@"; do
  if [[ "$arg" == "--online" ]]; then
    online_flag="true"
  elif [[ "$arg" == --acessos=* ]]; then
    total_acessos="${arg#*=}"
  fi
done

docker run --rm \
  --cpus="1" \
  --memory="8g" \
  --network="host" \
  -e ONLINE="$online_flag" \
  -e TOTAL_ACESSOS="$total_acessos" \
  -v "$volume" \
  "$image"
