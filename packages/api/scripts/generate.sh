mkdir -p tmp
curl https://developer.themoviedb.org/openapi/64542913e1f86100738e227f > tmp/tmdb-openapi.json
echo "/**
 * TMDB OpenAPI Types - Generated
 */" > src/TMDB.ts
pnpx @tim-smart/openapi-gen -s tmp/tmdb-openapi.json >> src/TMDB.ts
# pnpm eslint --fix src/TMDB.ts
