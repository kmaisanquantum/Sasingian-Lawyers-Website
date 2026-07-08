# Use Node.js 22 as the base
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package files from the current directory (which is now /frontend)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the current directory
COPY . .

# Run the build command
RUN npm run build

# Expose the port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]
