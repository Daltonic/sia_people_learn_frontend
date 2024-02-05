# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies in the container using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm run build

# Expose the port that the application will run on
EXPOSE 3000

# Create a directory for persistent data storage
VOLUME /data

# Define the command to start the application
CMD ["pnpm", "run", "start"]