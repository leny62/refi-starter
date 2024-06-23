CONF_DIR=default
env=$(SERVICE_ENV)

ifndef env
	env=default
endif

ifndef tag
	tag=latest
endif

ifeq ($(env),prod)
	AWS_REGION=us-west-2
	BUILD_ENV=:production
	CONF_DIR=prod
else ifeq ($(env),stage)
	BUILD_ENV=:staging
	CONF_DIR=stage
endif

ifndef profile
	profile=refistarter
endif

help: ## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/:.*##/:/'

build: ## Build distribution files
	echo "Build env=$(env)"
	cd website && make build
	# Add additional builds here

clean: ## Remove artifacts
	cd website && make clean
	# Add additional builds here
