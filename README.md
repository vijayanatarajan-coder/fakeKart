FakeKart ----------------

This is a full-stack eCommerce application where users can browse and view products, while administrators can manage (add, edit, delete) products through an authenticated dashboard. The frontend interacts with a backend API to fetch and manipulate product data stored in MongoDB. The application supports role-based access control and tracks user interaction via Google Analytics.

How to Run ------------------

1. Clone the repository
   bash
   Copy
   Edit
   git clone <your-repo-url>
   cd your-project-folder

2. Install dependencies (root folder)
   bash
   Copy
   Edit
   npm install

3. Setup and run frontend
   bash
   Copy
   Edit
   cd frontend
   npm install
   npm run dev
   Wait for the frontend to build. Make sure .env file is properly configured.

4. Configure backend
   Edit the backend/config/config.env file:
   env
   Copy
   Edit
   DB_LOCAL_URI=mongodb://localhost:27017/ecommerce

5. Seed the database
   bash
   Copy
   Edit
   cd .. # back to root folder
   npm run seeder

6. Run the backend in development mode
   bash
   Copy
   Edit
   npm run dev

7. Open the app
   Visit: http://localhost:8000

A11y and SEO ----------------

Semantic HTML elements used throughout

Used ARIA labels, tabIndex, and proper heading structure

Tested for accessibility and SEO using Lighthouse in Chrome DevTools

Tracking --------------

Integrated Google Analytics (GA4) via script tag in index.html

Tracked specific events like "View Details" button clicks using gtag("event", ...)

Helpful for monitoring user interaction and engagement

Security ----------------------

OAuth 2.0 used for authentication

Role-based access control: users and admins have different privileges

Users: View products

Admins: Add, edit, delete products

User details stored in MongoDB upon login

Admin access determined by checking email from a pre-seeded list in the database

Token storage-------------

Currently stored in sessionStorage (potentially vulnerable)

Future plan: Store tokens in HTTP-only cookies with expiration for improved security
