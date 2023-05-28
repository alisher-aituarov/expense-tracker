# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies from package-lock.json
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the Nest.js application will be listening on
EXPOSE 4000

CMD [ "" ]