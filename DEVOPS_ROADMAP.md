# 🚀 Comprehensive DevOps Roadmap & Practical Guide

A step-by-step practical guide to mastering DevOps concepts using your **Next.js Portfolio** project.

---

## 📌 Table of Contents
1. [DevOps Introduction](#1-devops-introduction)
2. [Step 1: Containerization (Docker & Dockerfile)](#step-1-containerization-docker--dockerfile)
3. [Step 2: Local Orchestration (Docker Compose)](#step-2-local-orchestration-docker-compose)
4. [Step 3: Automated CI/CD Pipelines (GitHub Actions)](#step-3-automated-cicd-pipelines-github-actions)
5. [Step 4: Free Deployment (Netlify & Docker Platforms)](#step-4-free-deployment-netlify--docker-platforms)
6. [Learning Progress Tracker](#learning-progress-tracker)

---

## 1. DevOps Introduction

### ❓ What is DevOps?
**DevOps** (Development + Operations) is a combination of cultural philosophies, practices, and tools that increases an organization's ability to deliver applications at high speed.

### 🔑 Key Concepts:
- **CI (Continuous Integration)**: Automatically build and test code whenever changes are committed.
- **CD (Continuous Deployment / Delivery)**: Automatically deploy code changes to production or staging environments.
- **Containerization**: Packaging an app with all its dependencies so it runs consistently anywhere.
- **Orchestration**: Managing and automating container lifetimes, networking, and scaling.

---

## Step 1: Containerization (Docker & Dockerfile)

### 📖 Definitions
- **Docker**: A tool designed to make it easier to create, deploy, and run applications by using containers.
- **Docker Image**: A read-only template that contains instructions for creating a Docker container.
- **Docker Container**: A runnable instance of a Docker image.
- **Dockerfile**: A text document containing all the commands a user could call on the command line to assemble an image.

### 🛠️ Step-by-Step Execution Plan:
1. Create `.dockerignore` to exclude node_modules and unnecessary build files.
2. Create a production-ready multi-stage `Dockerfile` tailored for Next.js (optimizes build speed and container size).
3. Build the Docker image locally:
   ```bash
   docker build -t next-portfolio:latest .
   ```
4. Run the Docker container locally:
   ```bash
   docker run -p 3000:3000 next-portfolio:latest
   ```

---

## Step 2: Local Orchestration (Docker Compose)

### 📖 Definitions
- **Docker Compose**: A tool for defining and running multi-container Docker applications using a single YAML configuration file (`docker-compose.yml`).

### 🛠️ Step-by-Step Execution Plan:
1. Create `docker-compose.yml` for development and production testing.
2. Launch the entire application stack:
   ```bash
   docker-compose up -d
   ```
3. Monitor logs and stop containers:
   ```bash
   docker-compose logs -f
   docker-compose down
   ```

---

## Step 3: Automated CI/CD Pipelines (GitHub Actions)

### 📖 Definitions
- **CI/CD Pipeline**: An automated process of building, testing, and deploying applications.
- **GitHub Actions**: An integrated CI/CD tool inside GitHub that automates workflows directly from your repository.

### 🛠️ Step-by-Step Execution Plan:
1. Create `.github/workflows/ci-cd.yml`.
2. Configure **Linting & Type Checking** job.
3. Configure **Build Verification** job.
4. Configure **Docker Build & Push** job to GitHub Container Registry (GHCR) or Docker Hub.

---

## Step 4: Free Deployment (Netlify & Docker Platforms)

### 📖 Definitions
- **Netlify**: A modern cloud platform that automates web project building, hosting, and serverless backend services.

### 🛠️ Step-by-Step Execution Plan:

#### Option A: Direct Netlify Deployment (Git Integration)
1. Push repository to GitHub.
2. Connect repository to Netlify Dashboard.
3. Set build command (`npm run build`) and publish directory (`.next` / default).
4. Auto-deploy on every `git push main`.

#### Option B: Netlify CLI Automated via CI/CD
1. Obtain Netlify Site ID & Personal Access Token.
2. Add secrets to GitHub Repository (`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`).
3. Add deployment step to `.github/workflows/ci-cd.yml` to trigger automatic deployment via GitHub Actions.

---

## Learning Progress Tracker

| Module | Status | Next Action |
|---|---|---|
| Step 1: Dockerfile & Containerization | ✅ Completed | Created `.dockerignore` & `Dockerfile` |
| Step 2: Docker Compose | ✅ Completed | Created `docker-compose.yml` |
| Step 3: GitHub Actions CI/CD | ✅ Completed | Built `.github/workflows/ci-cd.yml` |
| Step 4: Netlify Free Deployment | ✅ Completed | Configured `netlify.toml` & CI/CD Deploy |
