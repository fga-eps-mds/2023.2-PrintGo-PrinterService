#  Node.js Image
FROM node:16

# Diretory
WORKDIR /app

# Copy files
COPY . .

# Install npm
RUN npm install

# Expose port
EXPOSE 8080

# Start the project
CMD ["node", "app.js"]
