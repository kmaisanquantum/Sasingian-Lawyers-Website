# Sasingian Lawyers — Full-Stack Website

A complete website build: static frontend, Express backend, custom middleware, and a set of
REST APIs backing the People, Expertise, Insights, and Careers sections plus the contact
intake / newsletter forms.

## Project structure

```
sasingian-lawyers/
├── frontend/
│   └── index.html          # The full site (nav, megamenu, all sections, forms)
└── backend/
    ├── server.js            # Express app entry point
    ├── package.json
    ├── .env.example          # Copy to .env and adjust as needed
    ├── routes/               # One file per API resource
    │   ├── people.js
    │   ├── expertise.js
    │   ├── insights.js
    │   ├── careers.js
    │   ├── contact.js
    │   └── newsletter.js
    ├── middleware/
    │   ├── logger.js         # Request logging
    │   ├── rateLimiter.js    # General + form-specific rate limits
    │   ├── validate.js       # Contact/newsletter input validation
    │   └── errorHandler.js   # 404 + centralized error handling
    ├── utils/
    │   └── jsonStore.js      # Small JSON-file read/write/append helper
    └── data/                 # Flat-file "database" (JSON)
        ├── people.json
        ├── expertise.json
        ├── insights.json
        ├── careers.json
        ├── submissions.json  # Populated by POST /api/contact
        └── subscribers.json  # Populated by POST /api/newsletter
```

## Running it

```bash
cd backend
npm install
cp .env.example .env
npm start
```

The server starts on `http://localhost:4000` by default (change `PORT` in `.env`) and serves
**both** the frontend and the API from the same origin — open `http://localhost:4000` in a
browser and the site, mega-menu, filters, and forms are all live against the backend.

If you instead just open `frontend/index.html` directly as a file (no server running), the
site still works: the People/Insights sections fall back to the original static content with
client-side filtering, and the contact/newsletter forms fall back to a simulated success
message. This is a progressive-enhancement pattern — the frontend always tries the API first.

## API reference

All endpoints are namespaced under `/api`.

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/people?q=&category=` | Search/filter People groups |
| GET | `/api/people/:id` | Single People group |
| GET | `/api/expertise` | Core services + PNG sector focus |
| GET | `/api/expertise/services` | Core services only |
| GET | `/api/expertise/sectors` | Sector focus only |
| GET | `/api/insights?q=&category=` | Search/filter legal updates by keyword, Act, or practice |
| GET | `/api/insights/:id` | Single insight |
| GET | `/api/careers` | Career pathways + vacancies |
| GET | `/api/careers/vacancies` | Vacancies only |
| POST | `/api/contact` | Submit the enquiry/intake form |
| POST | `/api/newsletter` | Subscribe to the insights newsletter |

### Example requests

```bash
curl "http://localhost:4000/api/people?category=Litigation%20Teams"
curl "http://localhost:4000/api/insights?q=mining"

curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Jane Doe","email":"jane@example.com","matterDetail":"Need advice on a mining licence dispute."}'

curl -X POST http://localhost:4000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com"}'
```

## Middleware included

- **Logger** — timestamps every request with method, path, status, and response time.
- **Rate limiting** — a generous general limit (300 req / 15 min) on read endpoints, and a
  tighter limit (10 req / hour) on the contact and newsletter POST endpoints to deter spam.
- **Validation** — rejects malformed contact/newsletter submissions with a `422` and a list
  of specific field errors.
- **Security headers** — `helmet` is applied globally (CSP relaxed so the Google Maps embed
  and Google Fonts used by the frontend still load).
- **CORS** — enabled and configurable via `CORS_ORIGIN` in `.env`, in case you split the
  frontend onto a different origin/CDN later.
- **Centralized error handling + 404** — any thrown/unhandled error in a route returns a
  consistent JSON error shape instead of leaking a stack trace.

## Data storage

This build uses flat JSON files under `backend/data/` rather than a full database, so it runs
anywhere Node.js runs with zero external services. `people.json`, `expertise.json`,
`insights.json`, and `careers.json` are the site's content ("seed data") — edit them directly
to update what the site displays. `submissions.json` and `subscribers.json` start empty and
are appended to automatically as visitors use the site. Swapping this layer for a real
database later just means replacing `utils/jsonStore.js` — the routes don't need to change.

## Notes

- No authentication/admin layer is included for viewing `submissions.json` /
  `subscribers.json` — in production you'd want an authenticated admin endpoint or to pipe
  these into a CRM/email platform instead of a local file.
- The site's static fallback content in `frontend/index.html` intentionally mirrors the API's
  seed data, so the experience is consistent whether or not the backend is reachable.
