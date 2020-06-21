#!/usr/bin/env bash

curl --header "Content-Type: application/zip" --header "Authorization: Bearer ${NETLIFY_TOKEN}" --data-binary output.zip --url https://api.netlify.com/api/v1/sites/sudhanshutheone.netlify.com/deploys