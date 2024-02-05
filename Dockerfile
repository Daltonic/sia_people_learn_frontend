# Base image with Node.js
FROM node:18-alpine AS base

# Install build tools required by Next.js
RUN apk add --no-cache g++ make python3

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Expose port for the Next.js application
EXPOSE  3000

# Builder stage to build the Next.js application
FROM base AS builder

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm install && npm run build

# Production stage for the runtime environment
FROM base AS production

# Set environment variable for production
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci

# Add group and user for security purposes
RUN addgroup -g  1001 -S nodejs \
    && adduser -S nextjs -u  1001 -G nodejs

# Switch to the non-root user
USER nextjs

# Copy over the build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Start the application
CMD ["npm", "start"]
