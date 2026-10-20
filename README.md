## CandleShop Project Documentation

## Overview

**CandleShop** is a web application focused on the presentation and sale of handcrafted candles. The platform offers a clean and modern user experience, highlighting the product catalog and providing direct contact and institutional channels.

---

## Technologies Used

### Frontend

- **Framework:** Angular (v17+) with Server-Side Rendering (SSR) / Hydration enabled.
- **Language:** TypeScript, HTML5, SCSS.
- **Routing:** Angular Router.
- **Internal Web Server:** Nginx (for production in the frontend container).

### Infrastructure and Containers

- **Docker:** Creation of standardized images and environments.
- **Docker Compose:** Environment orchestration (frontend and backend services).

---

## How to Execute the Project

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Docker** and **Docker Compose** (optional for containerized execution)

---

### Local Execution (Development)

1. Navigate to the frontend directory:

   ```bash
   cd CandleShop-main/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Access the application in the browser at `http://localhost:4200`.

---

### Execution via Docker Compose

1. In the project root (`CandleShop-main/`), run:

   ```bash
   docker-compose up --build
   ```

2. The frontend application will be available on the configured port (usually `http://localhost` or `http://localhost:80`).
