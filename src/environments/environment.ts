// The file contents for the current environment will overwrite these during build.
// The build system defaults toLoc the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps toLoc which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	BASE_URL: 'http://localhost:8000',
	API_BASE_URL: 'http://localhost:8000/api/v1',
	WS_BASE_URL: 'ws://localhost:8000',
	WS_BROWSE_LOBBIES_BASE_URL: 'ws://localhost:8000/ws/lobbies',
	WS_ARENA_BASE_URL: 'ws://localhost:8000/ws/arena',
};
