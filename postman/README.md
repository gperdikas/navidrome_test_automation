# Postman

Manual exploration and documentation of the Navidrome REST API.

## What is here

- `Navidrome_crud.postman_collection.json` — login plus full CRUD on playlists, with assertions
- `Navidrome_admin.postman_environment.json` — `baseUrl` and a `token` variable

## What it does

The login request writes the auth token into the environment from its
after-response script, so every request after it is authenticated without
copy-pasting anything.

The collection cleans up after itself. Running it twice leaves nothing behind.

Playlists are named as `pm_crud_` followed by timestamp. This helps identify any data left behind, in the case the deletion process did not complete running.

## What it is not

Not the automated suite and not in CI. That is Playwright, in `tests/`.
This collection is where I explore an endpoint and learn how it behaves
before automating it.

## Using it

1. Import both files into Postman (File > Import)
2. Select the `Navidrome_admin` environment
3. Start Navidrome: `docker compose -f docker-compose.ci.yml up -d`
4. Run the login request first — everything else depends on the token it stores