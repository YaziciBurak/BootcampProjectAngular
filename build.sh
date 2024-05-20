#!/bin/bash

set -e

cat <<EOF > src/environments/environment.ts
export const environment = {API_URL:'$API_URL'}
EOF

cat <<EOF > src/environments/environment.development.ts
export const environment = {API_URL:'$API_URL'}
EOF

npm run build