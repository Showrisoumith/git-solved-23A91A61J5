#!/bin/bash
# Unified Deployment Script
# Version: 3.0.0
# Supports: production | development

set -e

# Detect or accept environment from argument or ENV variable
DEPLOY_ENV=${1:-${DEPLOY_ENV:-"development"}}

echo "====================================="
echo "DevOps Simulator - $DEPLOY_ENV Deploy"
echo "====================================="

# Common pre-deployment checks
echo "Running pre-deployment checks..."
if [ ! -f "config/app-config.yaml" ]; then
    echo "Error: Configuration file not found!"
    exit 1
fi

# Environment-specific configuration
if [ "$DEPLOY_ENV" = "production" ]; then
    # --- Production Config ---
    DEPLOY_REGION="us-east-1"
    APP_PORT=8080

    echo "Environment: $DEPLOY_ENV"
    echo "Region: $DEPLOY_REGION"
    echo "Port: $APP_PORT"

    echo "Starting production deployment..."
    echo "Pulling latest Docker images..."
    # docker pull devops-simulator:latest

    echo "Applying rolling update..."
    # kubectl rolling-update devops-simulator

    echo "Deployment completed successfully!"
    echo "Application available at: https://app.example.com"

elif [ "$DEPLOY_ENV" = "development" ]; then
    # --- Development Config ---
    DEPLOY_MODE="docker-compose"
    APP_PORT=3000
    ENABLE_DEBUG=true

    echo "Environment: $DEPLOY_ENV"
    echo "Mode: $DEPLOY_MODE"
    echo "Port: $APP_PORT"
    echo "Debug: $ENABLE_DEBUG"

    echo "Installing dependencies..."
    npm install

    echo "Running tests..."
    npm test

    echo "Starting development environment..."
    echo "Using Docker Compose..."
    docker-compose up -d

    echo "Waiting for application to be ready..."
    sleep 5

    echo "Performing health check..."
    curl -f http://localhost:$APP_PORT/health || exit 1

    echo "Deployment completed successfully!"
    echo "Application available at: http://localhost:$APP_PORT"
    echo "Hot reload enabled - code changes will auto-refresh"

else
    echo "Error: Unknown environment '$DEPLOY_ENV'."
    echo "Usage: ./deploy.sh [production|development]"
    exit 1
fi
