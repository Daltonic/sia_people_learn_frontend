# Use an official Node runtime as the base image
FROM node:18.18.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy yarn.lock to the working directory
COPY yarn.lock ./

# Install dependencies in the container
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Create a directory for persistent data storage
VOLUME /data

# Define the command to start the application
CMD ["yarn", "start"]