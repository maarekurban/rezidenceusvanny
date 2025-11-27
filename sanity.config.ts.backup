import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { defaultDocumentNode } from './sanity/lib/structure'

export default defineConfig({
  name: 'default',
  title: 'Rezidence U sv. Anny',

  projectId: 'eqq7fbzc',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      defaultDocumentNode,  // ✅ Live Preview!
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})



