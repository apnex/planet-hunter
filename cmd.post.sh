#!/bin/bash

read -r -d '' BODY <<EOF
{
	"value": "moo",
	"message": "moo"
}
EOF
echo ${BODY} | jq --tab

RESPONSE=$(curl -s -X POST \
	-H "Content-Type: application/json" \
	-d "${BODY}" \
http://localhost:4040)

echo "${RESPONSE}" | jq --tab .

