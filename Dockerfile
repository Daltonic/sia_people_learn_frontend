# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the rest of the application source code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Load environment variables from the .env file
RUN export $(cat .env | xargs)

# Build the Next.js application
RUN npm run build

# Expose the port that the application will run on
EXPOSE  3000

# Create a directory for persistent data storage
VOLUME /data

# Define the command to start the application
CMD ["npm", "start"]