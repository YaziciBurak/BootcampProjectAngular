#!/bin/bash

set -e

rm src/environments/environment.development.ts

cat <<EOF > src/environments/environments.ts
export const environment = {API_URL:'$API_URL'}
EOF

npm run build