exec_in_vite_container=docker compose exec js-vue-web-frontend
exec_in_php_container=docker compose exec php-web-backend

.PHONY: build start
all: build start
build:
	docker compose build
build_no_cache:
	docker compose build --no-cache
stop:
	docker compose down
down:
	docker compose down
run:
	docker compose up -d
up:
	docker compose up -d
start:
	docker compose up -d
build_start:
	docker compose build
rebuild: down build_no_cache up
	echo "rebuild"

npm_install:
	$(exec_in_vite_container) npm install $(p)
	$(exec_in_vite_container) npm i -D
vite_build:
	$(exec_in_vite_container) npm run build
vite_dev:
	$(exec_in_vite_container) npm run dev
vite_exec:
	$(exec_in_vite_container) $(c)


php_exec:
	$(exec_in_php_container) $(c)
