#!/bin/sh
# frontend/docker-entrypoint.sh

# Replace environment variables in nginx configuration
envsubst '${API_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;'
