#!/bin/bash

# Quick deployment script for Replit
# Usage: ./deploy.sh "Your commit message"

set -e

echo "🚀 Deploying to Replit..."

# Check if we have uncommitted changes
if [[ -n $(git status -s) ]]; then
  echo "📝 Uncommitted changes found. Committing..."
  git add .

  if [ -z "$1" ]; then
    echo "❌ Error: Please provide a commit message"
    echo "Usage: ./deploy.sh \"Your commit message\""
    exit 1
  fi

  git commit -m "$1"
  echo "✅ Changes committed"
else
  echo "✅ No uncommitted changes"
fi

# Push to Replit
echo "📤 Pushing to Replit..."
git push replit main

echo "🎉 Deployment complete!"
echo "🌐 Check your live site in a few moments"
