# 🏠 EstateVue — Real Estate Platform

A production-ready real estate platform with a complete DevOps pipeline demonstrating modern containerization, orchestration, and CI/CD practices.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Express](https://img.shields.io/badge/Express-4-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7-brightgreen) ![Docker](https://img.shields.io/badge/Docker-Compose-blue) ![K8s](https://img.shields.io/badge/Kubernetes-Ready-blueviolet)

---

## 📁 Project Structure

```
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # Node.js + Express + MongoDB
├── k8s/               # Kubernetes manifests
├── .github/workflows/ # GitHub Actions CI/CD
├── docker-compose.yml # Local multi-container setup
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/realestate-platform.git
cd realestate-platform

# Start all services
docker-compose up --build

# Access the app
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api/health
```

### Option 2: Local Development

```bash
# Terminal 1 — Start MongoDB (requires local MongoDB)
mongod

# Terminal 2 — Start Backend
cd backend
cp .env.example .env
npm install
npm run dev

# Terminal 3 — Start Frontend
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties?search=mumbai` | Search properties |
| GET | `/api/properties?minPrice=1000000&maxPrice=5000000` | Filter by price |
| GET | `/api/properties/:id` | Get single property |
| POST | `/api/properties` | Create property |

## 🐳 Docker

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☸️ Kubernetes Deployment

```bash
# Apply all manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb-pvc.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/mongodb-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

# Check status
kubectl get all -n realestate
```

> **Note:** Replace `YOUR_DOCKERHUB_USERNAME` in K8s deployment files with your actual Docker Hub username.

## 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yaml`) runs on push to `main`:

1. **Test** — Runs backend unit tests
2. **Build & Push** — Builds Docker images and pushes to Docker Hub
3. **Deploy** — SSHs into EC2 and applies K8s manifests

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |
| `EC2_HOST` | EC2 instance public IP |
| `EC2_SSH_KEY` | SSH private key for EC2 |

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, Mongoose, Morgan
- **Database:** MongoDB 7
- **DevOps:** Docker, Docker Compose, Kubernetes, GitHub Actions
- **Proxy:** Nginx (reverse proxy + static file server)
