# Use an official Node runtime as the base image
FROM node:18.18.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the container
RUN npm ci

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Create a directory for persistent data storage
VOLUME /data

# Define the command to start the application
CMD ["npm", "start"]