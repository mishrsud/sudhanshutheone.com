#!/usr/bin/env bash

#curl --header "Content-Type: application/zip" --header "Authorization: Bearer ${NETLIFY_TOKEN}" --data-binary output.zip --url https://api.netlify.com/api/v1/sites/sudhanshutheone.netlify.com/deploys
# Install Netlify CLI
npm install -g netlify-cli

# Authenticate Netlify CLI using the token
export NETLIFY_AUTH_TOKEN=$NETLIFY_TOKEN

netlify deploy --prod --dir=output
