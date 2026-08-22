# KickEvent frontend

The KickEvent frontend is a Vite-built React single-page application. Vite
writes the production bundle to `build/`; the Docker image serves that bundle
with Nginx.

## Prerequisites

- Node.js 20.19 or newer for local development (the production build stage
  uses Node.js 25)
- npm 10 or newer
- The KickEvent backend running locally when API calls are needed

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_BACKEND_URL` to the backend URL, normally
   `http://localhost:8080`, without a trailing slash.
3. Set `VITE_GOOGLE_MAPS_API_KEY` if map and place search features are needed.
4. Install the exact dependency tree and start Vite:

   ```sh
   npm ci
   npm run start
   ```

Open <http://localhost:3000>. Vite reloads source changes automatically.

Useful production checks:

```sh
npm run build       # writes the static site to build/
npm run serve       # previews the build locally
```

The `VITE_*` values are read by Vite when the bundle is built. Changing a
local `.env` file while a preview is running requires running `npm run build`
again.

## Docker

Build and run the same image used in production:

```sh
docker build \
  --build-arg VITE_BACKEND_URL=https://api.example.com \
  --build-arg VITE_GOOGLE_MAPS_API_KEY=your-public-google-key \
  -t kickevent-frontend .

docker run --rm -p 8080:80 kickevent-frontend
```

The site is then available at <http://localhost:8080>. Nginx exposes
`/healthz` for platform health checks and falls back to `index.html` for
client-side routes such as `/event/123`.

`VITE_BACKEND_URL` and `VITE_GOOGLE_MAPS_API_KEY` are public build-time
configuration. Vite embeds them in the JavaScript bundle; they are not runtime
container environment variables and changing them requires a new image build.
Restrict the Google Maps key by HTTP referrer and API, and never put private
credentials in a `VITE_*` variable.

## Coolify

Create a Coolify **Application** from this repository and select the Dockerfile
build pack.

Use these settings:

| Setting | Value |
| --- | --- |
| Dockerfile location | `/Dockerfile` |
| Container port | `80` |
| Health check path | `/healthz` |

Add the following under **Build Arguments** (not Runtime Environment
Variables), then trigger a new deployment:

| Build argument | Example | Purpose |
| --- | --- | --- |
| `VITE_BACKEND_URL` | `https://api.example.com` | Public backend base URL, without a trailing slash |
| `VITE_GOOGLE_MAPS_API_KEY` | `AIza...` | Browser-restricted Google Maps key |

These are intentionally build-only values because a static Vite bundle cannot
read new Vite configuration after it has been built. Coolify's runtime
environment-variable section does not change an already-built frontend; edit
the build arguments and redeploy whenever either value changes.

No Azure Static Web Apps workflow or Azure-specific runtime configuration is
required.
