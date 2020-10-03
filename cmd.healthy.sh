#!/bin/bash

read -r -d '' BODY <<EOF
{
	"status": "healthy"
}
EOF
echo ${BODY} | jq --tab

RESPONSE=$(curl -s -X POST \
	-H "Content-Type: application/json" \
	-d "${BODY}" \
http://localhost:4040/status)

echo "${RESPONSE}" | jq --tab .

