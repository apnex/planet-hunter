#!/bin/bash

function setStatus {
	local ID="${1}"
	local STATUS="${2}"
	read -r -d "" BODY <<-EOF
	{
		"id": "${ID}",
		"status": "${STATUS}"
	}
	EOF
	echo "${BODY}" | jq --tab .
	local RESPONSE=$(curl -s -X POST \
		-H "Content-Type: application/json" \
		-d "${BODY}" \
	"http://localhost:4040/status")
	#echo "${RESPONSE}" | jq --tab .
	echo "${RESPONSE}"
}

ID=${1}
STATUS=${2}
if [[ -n "${ID}" && -n "${STATUS}" ]]; then
	echo "ID is set: ${ID}"
	echo "STATUS is set: ${STATUS}"
	setStatus "${ID}" "${STATUS}"
else
	echo "ID and/or STATUS is NOT set"
	## list items
fi


