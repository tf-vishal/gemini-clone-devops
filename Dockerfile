FROM node:18-alpine AS builder

LABEL maintainer="Vishal Sharma `vvishalsharma0609@gmail.com`" \
                    app-name="gemini-app" \
                    stage="build"

WORKDIR /app

# Downloading the dependencies
COPY package*.json .
RUN npm install

# Copy application 
COPY . .
RUN npm run build

# Delete the node_modules and clean the cache
RUN rm -rf node_modules && npm cache clean --force

# Stage 2 - Production stage

FROM node:18-alpine AS production

LABEL maintainer="Vishal Sharma `vvishalsharma0609@gmail.com`" \
                    app-name="gemini-app" \
                    stage="production"

WORKDIR /app

# Copy only dependencies file
COPY package.*json .
RUN npm install --omit=dev && npm cache clean --force


# Copy the build files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "start" ]