#!/bin/bash

set -o xtrace
set -e

rm environments/environment.development.ts

cat <<EOF > environments/environments.ts
export const environment = {API_URL:'$API_URL'}
EOF

npm run build