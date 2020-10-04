#!/bin/bash

curl -s localhost:4040/status | jq --tab .

