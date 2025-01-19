#!/bin/sh

# Replace environment variables in nginx configuration
envsubst '${API_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Verify nginx configuration
nginx -t

# Start nginx
nginx -g 'daemon off;'
