#!/usr/bin/env bash

# Generate content
wyam build -r blog -t CleanBlog

# Zip the output directory
zip output.zip output/**/*

# Upload to Netlify
curl --header "Content-Type: application/zip" --header "Authorization: Bearer ${NETLIFY_TOKEN}" --data-binary output.zip --url https://api.netlify.com/api/v1/sites/sudhanshutheone.netlify.com/deploys
