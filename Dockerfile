FROM node:22-slim

# System deps for Python pipeline and Claude CLI
RUN apt-get update && \
    apt-get install -y --no-install-recommends git python3 python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*

# Install Claude CLI globally
RUN npm install -g @anthropic-ai/claude-code

WORKDIR /app

# Install Node dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app + pipeline
COPY . .

# Bootstrap Python venv for pipeline scripts
RUN python3 -m venv pipeline/.venv && \
    pipeline/.venv/bin/pip install -r pipeline/requirements.txt

# Use --webpack flag to avoid Next 16 turbopack panic
RUN npx next build --webpack

EXPOSE 3000

# Entrypoint rebuilds catalog if transcripts changed, then starts app
COPY deploy/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "start"]
