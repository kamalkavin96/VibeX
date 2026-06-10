# VibeX
<p align="center">
  <p align="center">
    <img src="assets/logo.png" alt="Project Logo" width="560"/>
  </p>

  # VibeX

  [![Backend Version](https://img.shields.io/badge/backend-0.0.1--SNAPSHOT-blue.svg?style=for-the-badge)](VibeXBackend/pom.xml) [![Frontend Version](https://img.shields.io/badge/frontend-0.0.0-lightgrey.svg?style=for-the-badge)](VibeXFrontend/package.json) [![Java 21](https://img.shields.io/badge/Java-21-informational.svg?style=for-the-badge&logo=java)](https://www.oracle.com/java/) [![React 19](https://img.shields.io/badge/React-19.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-7.2.4-yellow.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.18-teal.svg?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/) [![Postgres](https://img.shields.io/badge/Postgres-16-blue.svg?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/) [![MinIO](https://img.shields.io/badge/MinIO-ready-lightgrey.svg?style=for-the-badge&logo=minio)](https://min.io/) [![Maven](https://img.shields.io/badge/Maven-3.9-orange.svg?style=for-the-badge&logo=apachemaven)](https://maven.apache.org/) [![Node.js](https://img.shields.io/badge/Node.js-18-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/) [![npm](https://img.shields.io/badge/npm-9.8.1-red.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/) [![Spring](https://img.shields.io/badge/Spring_Boot-4.0.1-brightgreen.svg?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot) [![SpringDoc](https://img.shields.io/badge/OpenAPI-SpringDoc-lightgrey.svg?style=for-the-badge&logo=swagger)](https://springdoc.org/) [![Logstash](https://img.shields.io/badge/Logstash-ready-blue.svg?style=for-the-badge&logo=logstash)](https://www.elastic.co/logstash) [![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-ready-blue.svg?style=for-the-badge&logo=opentelemetry)](https://opentelemetry.io/) [![Axios](https://img.shields.io/badge/Axios-1.13.2-lightgrey?style=for-the-badge&logo=axios)](https://axios-http.com/) [![Framer Motion](https://img.shields.io/badge/Framer--Motion-12.23.26-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/) [![hls.js](https://img.shields.io/badge/hls.js-1.6.15-blue?style=for-the-badge)](https://github.com/video-dev/hls.js/) [![React Router](https://img.shields.io/badge/React--Router-7.11.0-blue?style=for-the-badge&logo=react-router)](https://reactrouter.com/) [![React Toastify](https://img.shields.io/badge/React--Toastify-11.0.5-orange?style=for-the-badge)](https://fkhadra.github.io/react-toastify/) [![Recharts](https://img.shields.io/badge/Recharts-3.6.0-red?style=for-the-badge)](https://recharts.org/) [![Lucide](https://img.shields.io/badge/Lucide-0.562.0-lightgrey?style=for-the-badge)](https://lucide.dev/) [![React Icons](https://img.shields.io/badge/React--Icons-5.5.0-lightgrey?style=for-the-badge)](https://react-icons.github.io/react-icons/) [![OkHttp](https://img.shields.io/badge/OkHttp-4.12.0-blue?style=for-the-badge&logo=okhttp)](https://square.github.io/okhttp/) [![Lombok](https://img.shields.io/badge/Lombok-1.18.42-yellow?style=for-the-badge&logo=lombok)](https://projectlombok.org/) [![CI](https://img.shields.io/badge/CI-Unavailable-lightgrey.svg?style=for-the-badge)](https://github.com/<OWNER>/<REPO>/actions)

  VibeX is a full-stack, developer-friendly music and playlist management platform combining a Spring Boot backend and a React (Vite) frontend. It ships with Docker Compose for local dev (MinIO + Postgres) and aims to be a minimal, extendable starter for streaming/podcasting/playlist apps.

  ## What I changed here (summary)
  - Added expanded component and storage documentation.
  - Added ER/architecture diagrams (Mermaid) and sample DB schema.
  - Included a sample GitHub Actions workflow so you can enable a CI badge after you set your GitHub repo slug.

  ---

  ## Badges (how to make them work)
  - The top badges showing backend/frontend versions are static shields created from local manifest values and will render anywhere.
  - The CI badge is currently a placeholder. To enable a live CI badge:
    1. Push this repository to GitHub (owner/repo).
    2. Replace `<OWNER>` and `<REPO>` in the CI badge link above with your GitHub owner and repository name.
    3. The CI badge will point to the workflow file `.github/workflows/ci.yml` (included in this repo). Once GitHub runs the workflow, the badge will reflect status.

  ## Quick start (local)
  Start MinIO and Postgres, then run backend and frontend.

  ```bash
  cd docker
  docker-compose up -d minio pgdb

  # backend
  cd VibeXBackend
  ./mvnw spring-boot:run

  # frontend
  cd VibeXFrontend
  npm install
  npm run dev
  ```

  Open frontend at `http://localhost:5173` and MinIO console at `http://localhost:9001`.

  Default local Docker creds (see `docker/docker-compose.yml`):
  - MinIO: `minioadmin` / `minioadmin` (console at `:9001`)
  - Postgres: `postgres` / `postgres` (DB: `vibex_db`)

  ## Component breakdown

  Backend (`VibeXBackend`)
  - `src/main/java/com/kamalkavin96/...` — controllers, services, repositories, models
  - Key responsibilities:
    - REST API endpoints under `/api` (playlist/song operations)
    - Persistence via Spring Data JPA (Postgres)
    - File storage using MinIO (S3-compatible)
    - OpenAPI docs via SpringDoc

  Frontend (`VibeXFrontend`)
  - `src/pages`, `src/components`, `src/services` — UI and API adapters
  - Key responsibilities:
    - Responsive UI (Tailwind)
    - HLS playback using `hls.js`
    - Axios for API calls; uses `VITE_API_BASE_URL` environment variable

  Docker / DevOps
  - `docker/docker-compose.yml` — MinIO + Postgres compose services
  - Observability configs (commented): Logstash, Elastic, Tempo, OTEL collector

  ## Project Insights

  ### Activity snapshot
  This project is structured as a full-stack application with a Java backend and React frontend. A GitHub-style activity chart can be generated from commit history and shown as a green-workday visual, for example by embedding a contribution heatmap image or a generated SVG.

  ```mermaid
  gantt
    dateFormat  YYYY-MM-DD
    title Project contribution rhythm
    section Backend
    Java work                    :done,    des1, 2026-05-01, 10d
    section Frontend
    React & UI work              :active,  des2, 2026-05-11, 8d
    section DevOps
    Docker / MinIO / Postgres    :done,    des3, 2026-05-19, 4d
  ```

  ### Language distribution
  The repository is primarily driven by Java and React/JS code, with supporting configuration and static assets.

  | Language | Role | Primary folders |
  |---|---|---|
  | Java | Backend API, data access, business logic | `VibeXBackend/src/main/java` |
  | JavaScript / JSX | Frontend UI, routing, playback | `VibeXFrontend/src` |
  | HTML | App shell and metadata | `VibeXFrontend/index.html` |
  | CSS / Tailwind | Styling and responsive layout | `VibeXFrontend/src` |
  | YAML / Properties | Configuration, Docker compose | `VibeXBackend/src/main/resources`, `docker/` |

  ```mermaid
  pie title Estimated code distribution
    "Java" : 45
    "JavaScript / JSX" : 35
    "YAML / Config" : 10
    "HTML / Assets" : 10
  ```

  ### Insight ideas
  - Add a GitHub contributions heatmap screenshot or dynamically generated SVG to show daily work intensity.
  - Show a language breakdown chart, component sizes, or test coverage summary.
  - Add badges for code quality, dependency health, or build status to turn the README into a project dashboard.

  ## Storage structure

  MinIO buckets (configured in `application.yml`):

  - `playlist-images` — playlist cover images (small objects)
  - `song-files` — song/audio files (large objects, streamable)
  - `user-avatars` — user profile images

  Volumes in `docker-compose.yml`:
  - `minio-data` — MinIO persistent store
  - `pgdata` — Postgres data

  ## Suggested database schema
  The project uses PostgreSQL. Below is a reasonable schema for playlists, songs, users, and relationship tables. Adapt column types and constraints to your needs.

  ```sql
  CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(200),
    email VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE songs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    artist VARCHAR(200),
    duration_seconds INTEGER,
    minio_object_key TEXT NOT NULL,
    content_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE playlists (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    description TEXT,
    owner_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    cover_image_key TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );

  CREATE TABLE playlist_songs (
    playlist_id BIGINT REFERENCES playlists(id) ON DELETE CASCADE,
    song_id BIGINT REFERENCES songs(id) ON DELETE CASCADE,
    position INTEGER DEFAULT 0,
    PRIMARY KEY (playlist_id, song_id)
  );
  ```

  Mermaid ER diagram (simplified):

  ```mermaid
  erDiagram
      USERS ||--o{ PLAYLISTS : owns
      PLAYLISTS ||--o{ PLAYLIST_SONGS : contains
      SONGS ||--o{ PLAYLIST_SONGS : included_in
  ```

  ## Component / sequence flow (upload & playback)

  ```mermaid
  sequenceDiagram
    participant UI as Frontend
    participant API as Backend
    participant MINIO as MinIO
    participant DB as Postgres

    UI->>API: POST /api/songs (metadata + file)
    API->>MINIO: PUT object (song-files/<id>)
    API->>DB: INSERT song metadata (minio_object_key)
    DB-->>API: 201 Created
    API-->>UI: 201 Created (song id)

    UI->>API: GET /api/playlists/1
    API->>DB: SELECT playlist, songs
    API-->>UI: JSON with song URLs (signed MinIO URLs)
    UI->>MINIO: GET song file (stream/hls)
  ```

  ## Swagger / OpenAPI (API docs)

  The backend includes SpringDoc to expose OpenAPI (Swagger) documentation.

  - Swagger UI (interactive docs): http://localhost:8080/swagger-ui.html or http://localhost:8080/swagger-ui/index.html
  - Raw OpenAPI JSON: http://localhost:8080/v3/api-docs

  If you run the backend with `./mvnw spring-boot:run` the docs are available on the configured port (default `8080`). SpringDoc is already declared in the backend `pom.xml` (`org.springdoc:springdoc-openapi-starter-webmvc-ui`).

  ## Dependencies (detailed)

  Backend (Java / Maven) — key dependencies from `VibeXBackend/pom.xml`:

  - `org.springframework.boot:spring-boot-starter-webmvc` — core web framework
  - `org.springframework.boot:spring-boot-starter-data-jpa` — JPA and Hibernate
  - `org.springdoc:springdoc-openapi-starter-webmvc-ui` — OpenAPI / Swagger UI
  - `io.minio:minio` — MinIO S3 client for object storage
  - `org.projectlombok:lombok` (optional) — reduces boilerplate via annotations
  - `com.squareup.okhttp3:okhttp` — HTTP client used for outgoing requests
  - `org.postgresql:postgresql` (runtime) — Postgres JDBC driver

  Commented / optional in `pom.xml`:

  - `net.logstash.logback:logstash-logback-encoder` — Logstash-friendly JSON encoder (present but commented)
  - `io.opentelemetry:*` libraries — OpenTelemetry instrumentation (commented)

  Frontend (React / Vite) — dependencies from `VibeXFrontend/package.json`:

  - `react` / `react-dom` — UI library
  - `@vitejs/plugin-react` — Vite React plugin
  - `vite` — dev server & build tool
  - `tailwindcss` and `@tailwindcss/vite` — utility-first CSS
  - `axios` — HTTP client for API calls
  - `hls.js` — HLS playback support
  - `framer-motion` — animations
  - `lucide-react` — icon set
  - `react-icons` — additional icons
  - `react-router` / `react-router-dom` — routing
  - `react-toastify` — toast notifications
  - `recharts` — charts and visualizations

  Frontend devDependencies:

  - `@eslint/js`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` — linting
  - `@types/react`, `@types/react-dom` — TypeScript types (if using TS)

  If you want, I can expand each listed dependency to include version numbers, purpose, and links to docs. I can also generate a `dependencies.md` file with direct references and suggested alternatives.
  ## Graphical insight & suggestions
  - Add a small dashboard (Grafana) to display:
    - number of songs, playlists, storage usage (MinIO)
    - active users and API response times
  - Add automated tests for: upload/download flow, playlist CRUD, DB constraints

  ## Enabling CI badge (next steps)
  1. Push repo to GitHub.
  2. Replace `<OWNER>` and `<REPO>` in the CI badge link at top with your GitHub values.
  3. The included workflow `.github/workflows/ci.yml` will run on push/PR and the badge will update.

  ---

  If you'd like, I will:
  - create/commit a `LICENSE` file (recommend MIT),
  - enable the CI badge by updating the README with your GitHub owner/repo slug, and
  - add a basic Grafana dashboard template or Prometheus metrics endpoints.

  Tell me which of the above to do next and I'll proceed.
