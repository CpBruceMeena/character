PORT ?= 3000

.PHONY: dev build lint clean run

## dev       — Start the development server (default port 3000)
dev:
	pnpm dev --port $(PORT)

## build     — Create an optimized production build
build:
	pnpm build

## lint      — Run the linter
lint:
	pnpm lint

## run       — Start via run.sh (auto-detects free port)
run:
	./run.sh $(PORT)

## clean     — Remove build artifacts and dependencies
clean:
	rm -rf .next
	rm -rf node_modules
	rm -rf pnpm-lock.yaml
	@echo "  Cleaned .next, node_modules, and lockfile."

## install   — Install project dependencies
install:
	pnpm install

## help      — Show this help
help:
	@echo "Usage:"
	@echo "  make dev       Start dev server on port $(PORT)"
	@echo "  make build     Production build"
	@echo "  make lint      Run ESLint"
	@echo "  make run       Start via run.sh (auto-detects free port)"
	@echo "  make clean     Remove .next, node_modules, lockfile"
	@echo "  make install   Install dependencies"
	@echo ""
	@echo "Override port:  make dev PORT=4000"
