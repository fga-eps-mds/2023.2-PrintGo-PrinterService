#  Node.js Image
FROM node:14

# Diretory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY App.js ./

# Install npm
RUN npm install

# Expose port
EXPOSE 8080

# Start the project
CMD ["node", "app.js"]
