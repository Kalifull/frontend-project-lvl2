install-deps: # Install dependencies
	npm ci
	npm link

publish: # Publish npm package
	npm publish --dry-run

lint: # Run linter
	npx eslint .

test: # Run tests
	npm test

test-watch: # Run tests with watch
	npm test -s -- --watch

test-coverage: # Run coverage tests
	npm test -- --coverage --coverageProvider=v8
