# Build stage
FROM oven/bun:1 as builder

WORKDIR /app

# Add build arguments
ARG API_URL
ARG VITE_BACKEND_URL

# Set environment variables
ENV API_URL=$API_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Install dependencies
COPY package.json bun.lockb ./
COPY tsconfig*.json ./

# Create temporary directory for TypeScript build info
RUN mkdir -p ./node_modules/.tmp

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Copy static files
COPY 50x.html /usr/share/nginx/html/50x.html

# Build the application
RUN bun run build

# Production stage
FROM nginx:alpine

# Set environment variable for nginx configuration
ENV API_URL=${API_URL}

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config template and entrypoint script
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# Add health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -qO- http://localhost:80/health || exit 1

EXPOSE 80

CMD ["/docker-entrypoint.sh"]
