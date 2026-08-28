# KickEvent frontend

KickEvent is a React/Vite single-page application for creating and finding football events.

[Open the live demo](https://kickevent.mxhndk.de) · [View the backend repository](https://github.com/maxih4/kickevent)

## Features

- Browse, search, sort, and paginate events.
- Register and log in with token refresh handling.
- Create, edit, and delete events.
- Select event locations with Google Places address autocomplete.
- View locations on Google Maps and open Google Maps route calculation.
- Create, edit, and delete comments.
- Use a role-based user and admin panel.

## Stack and techniques

- React and Vite
- React Router for client-side routing
- TanStack React Query for server state, caching, and mutations
- Axios for API requests
- Ant Design, MUI Icons, and Tailwind CSS for the interface
- Google Maps and Places API for location search, maps, and route links
- DOMPurify for sanitizing rendered event content

## Local development

Requirements: Node.js 20.19 or newer, npm 10 or newer, and a running KickEvent backend when API calls are needed.

Copy `.env.example` to `.env.local`, then configure the variables described below.

```sh
npm ci
npm run start
```

The development server runs at <http://localhost:3000>. Use `npm run build` to create a production build.

## Environment variables

Vite reads these values when the frontend is built. They are embedded in the client bundle, so do not put private credentials in a `VITE_*` variable.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_BACKEND_URL` | Yes | Base URL of the KickEvent backend, for example `http://localhost:8080`. Do not add a trailing slash. |
| `VITE_GOOGLE_MAPS_API_KEY` | No | Browser-restricted Google Maps API key for address autocomplete, maps, and route links. Map features are unavailable when it is empty. |

Changing either value requires a new frontend build and deployment.

## Deployment

The frontend is built into a Docker image and served as a static site with Nginx. Production deployment is automated through Coolify on private infrastructure. `VITE_*` values are supplied at build time and require a new build when they change.
