import { defineConfig } from "orval"

const OPENAPI_SPEC_PATH = "../../docs/openapi/openapi.json"

export default defineConfig({
  api: {
    input: {
      target: OPENAPI_SPEC_PATH,
    },
    output: {
      mode: "tags-split",
      target: "./lib/api/generated",
      schemas: "./lib/api/generated/model",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: "/api",
      clean: true,
      mock: {
        indexMockFiles: true,
        generators: [
          {
            type: "msw",
            baseUrl: "/api",
            delay: 200,
            useExamples: true,
          },
        ],
      },
      override: {
        mutator: {
          path: "./lib/api/custom-fetch.ts",
          name: "customFetch",
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
        query: {
          useSuspenseQuery: true,
        },
      },
    },
  },
  zod: {
    input: {
      target: OPENAPI_SPEC_PATH,
    },
    output: {
      mode: "tags-split",
      target: "./types/generated",
      fileExtension: ".zod.ts",
      client: "zod",
      clean: true,
      override: {
        zod: {
          version: 4,
          generateReusableSchemas: true,
        },
      },
    },
  },
})
