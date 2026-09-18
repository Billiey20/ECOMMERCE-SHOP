# Production Build & Deployment Guide

This guide outlines the steps required to deploy ShopFlow to a production environment.

## 1. Environment Configuration

Before building or deploying, ensure that environment variables are properly set.
See `server/.env.example` and `client/.env.example` for the required keys.

**Client Environment Variables:**
The frontend code currently hardcodes `http://localhost:5000` in fetch requests. For a true production build, these should be replaced with `import.meta.env.VITE_API_URL`. Ensure `VITE_API_URL` points to your deployed backend URL.

## 2. Frontend Deployment (Vercel / Netlify)

The React SPA is built using Vite.

### Build Steps:
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Create a production build: `npm run build`
4. The output will be placed in the `dist` folder.

### Deployment:
- On **Vercel** or **Netlify**, connect your GitHub repository.
- Set the Root Directory to `client`.
- The Build Command is `npm run build` and the Output Directory is `dist`.
- Configure SPA routing by adding a rewrite rule to serve `index.html` for all paths.

## 3. Backend Deployment (Render / AWS / Heroku)

The Node.js/Express backend requires a Node environment and access to a MySQL database.

### Deployment Steps:
1. Provision a managed MySQL database (e.g., AWS RDS, DigitalOcean Managed Databases).
2. Execute the database initialization scripts located in the `database` folder to create the schema and seed data.
3. Deploy the `server` directory as a Node web service.
4. Set the environment variables (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`, `PORT`) in the hosting provider's dashboard.
5. The start command is `node src/index.js`.

## 4. Security Considerations for Production

- **CORS:** Update the `cors()` middleware in `server/src/index.js` to only accept requests from your production frontend URL (e.g., `https://shopflow.yourdomain.com`).
- **Passwords:** Ensure bcrypt salt rounds are adequate (currently set to 10).
- **HTTPS:** Ensure the hosting provider terminates SSL and only serves the API over HTTPS.
