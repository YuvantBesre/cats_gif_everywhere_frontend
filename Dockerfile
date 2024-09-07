# Build Stage
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose 3000 port for running
EXPOSE 3000

CMD ["npm", "run", "dev"]


