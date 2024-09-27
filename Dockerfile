FROM mcr.microsoft.com/playwright:v1.47.2-focal

# Set the working directory in the container
WORKDIR /src

# Copy the project files into the container
COPY . .

# Install npm dependencies
RUN npm install

# Run Playwright tests
CMD ["npx", "playwright", "test", "--reporter=list"]
