# syntax=docker/dockerfile:1

FROM node:25-bookworm-slim AS build

WORKDIR /app

# Keep dependency installation cacheable when only application sources change.
COPY package.json package-lock.json ./
RUN npm ci

# Vite embeds VITE_* values into the static bundle during this build step.
ARG VITE_BACKEND_URL
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
