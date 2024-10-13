#!/usr/bin/env bash

#curl --header "Content-Type: application/zip" --header "Authorization: Bearer ${NETLIFY_TOKEN}" --data-binary output.zip --url https://api.netlify.com/api/v1/sites/sudhanshutheone.netlify.com/deploys
# Install Netlify CLI
npm install -g netlify-cli

# Authenticate Netlify CLI using the token
export NETLIFY_AUTH_TOKEN=$NETLIFY_AUTH_TOKEN

# Deploy the site
netlify deploy --site 05f90622-e089-411a-a051-723a8cae32db --prod --dir=output
