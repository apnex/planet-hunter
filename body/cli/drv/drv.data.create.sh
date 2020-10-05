#!/bin/bash
if [[ $0 =~ ^(.*)/[^/]+$ ]]; then
	WORKDIR=${BASH_REMATCH[1]}
fi
source ${WORKDIR}/mod.driver

# inputs
APIHOST="http://localhost:4041"
ITEM="data"
INPUTS=()

# makeBody
makeBody() {
	read -r -d "" BODY <<-EOF
	{
		"key": "mercury",
		"value": {
			"index": 1,
			"info": "First planet from the sun"
		}
	}
	EOF
	printf "${BODY}"
}

# apiGet
apiPost() {
	local URL="${1}"
	local BODY="${2}"
	local RESPONSE=$(curl -s -X POST \
		-H "Content-Type: application/json" \
		-d "${BODY}" \
	"${URL}")
}

# run
run() {
	URL="${APIHOST}"
	URL+="/${ITEM}"
	local BODY=$(makeBody)
	if [[ -n "${URL}" ]]; then
		printf "[$(cgreen "INFO")]: api [$(cgreen "list")] ${ITEM} [$(cgreen "${URL}")]... " 1>&2
		echo "[$(ccyan "DONE")]" 1>&2
		echo "${BODY}"
		apiPost "${URL}" "${BODY}"
	fi
}

# driver
driver "${@}"
