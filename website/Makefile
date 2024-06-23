ifeq ($(env),prod)
	BUILD_ENV=:production
else ifeq ($(env),stage)
	BUILD_ENV=:staging
endif

help: ## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/:.*##/:/'

build: ## Build distribution files
	echo "env=$(env)"
	echo "Build Env=$(BUILD_ENV)"
	yarn install
	yarn run build$(BUILD_ENV)

run: build ## Start the local server
	yarn run start

clean: ## Remove artifacts
	rm -rf dist
	rm -rf node_modules
