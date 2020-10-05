#!/bin/bash
if [[ $0 =~ ^(.*)/[^/]+$ ]]; then
	WORKDIR=${BASH_REMATCH[1]}
fi
source ${WORKDIR}/mod.driver

# inputs
APIHOST="http://localhost:4041"
ITEM="data"
INPUTS=()

# apiGet
apiGet() {
	local URL="${1}"
	local RESPONSE=$(curl -s -X GET "${URL}")
	printf "${RESPONSE}"
}

# run
run() {
	URL="${APIHOST}"
	if [[ -n "${1}" ]]; then
		URL+="/${ITEM}/${1}"
		printf "[$(cgreen "INFO")]: api [$(cgreen "list")] ${ITEM} [$(cgreen "${URL}")]... " 1>&2
		echo "[$(ccyan "DONE")]" 1>&2
		apiGet "${URL}"
	else
		echo "[$(corange "ERROR")]: command usage: [$(ccyan " data.get <data.key> ")] " 1>&2
	fi
}

# driver
driver "${@}"
