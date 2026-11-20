import { readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createMarkdownFromOpenApi } from "@scalar/openapi-to-markdown"

const currentDir = dirname(fileURLToPath(import.meta.url))
const docsDir = resolve(currentDir, "../../../docs/openapi")
const openApiPath = resolve(docsDir, "openapi.json")
const markdownPath = resolve(docsDir, "openapi.md")

const specContent = await readFile(openApiPath, "utf8")
const markdown = await createMarkdownFromOpenApi(specContent)
await writeFile(markdownPath, markdown, "utf8")
