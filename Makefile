.DEFAULT_GOAL := help

# ──────────────────────────────────────────────────────────────
# DCRM Makefile — common dev and deploy commands
# ──────────────────────────────────────────────────────────────

.PHONY: help install dev build deploy migrate static lint test tag

help:
	@echo ""
	@echo "  DCRM Project Commands"
	@echo "  ─────────────────────────────────────────────────────"
	@echo "  install     Install all Python + Node dependencies"
	@echo "  dev         Start Django dev server + Vite dev server"
	@echo "  build       Build frontend for production"
	@echo "  deploy      Full production deployment (build + migrate + static)"
	@echo "  migrate     Run Django migrations"
	@echo "  static      Collect static files"
	@echo "  lint        Run ruff (Python) + eslint (TypeScript)"
	@echo "  test        Run Django test suite"
	@echo "  tag         Create and push v0.1.0-ui-approval git tag"
	@echo ""

install:
	python3 -m venv .venv && . .venv/bin/activate && pip install -r requirements/development.txt
	cd frontend && npm install

dev:
	@echo "Start frontend in a separate terminal: cd frontend && npm run dev"
	. .venv/bin/activate && python manage.py runserver

build:
	cd frontend && npm run build

deploy: build
	. .venv/bin/activate && \
	DJANGO_SETTINGS_MODULE=config.settings.production python manage.py collectstatic --noinput && \
	DJANGO_SETTINGS_MODULE=config.settings.production python manage.py migrate --noinput && \
	mkdir -p tmp && touch tmp/restart.txt
	@echo "Deployment complete."

migrate:
	. .venv/bin/activate && python manage.py migrate

static:
	. .venv/bin/activate && \
	DJANGO_SETTINGS_MODULE=config.settings.production python manage.py collectstatic --noinput

lint:
	. .venv/bin/activate && ruff check . || true
	cd frontend && npx eslint src --ext .ts,.tsx || true

test:
	. .venv/bin/activate && python manage.py test

tag:
	git tag v0.1.0-ui-approval
	git push origin v0.1.0-ui-approval
	@echo "Tagged v0.1.0-ui-approval"
