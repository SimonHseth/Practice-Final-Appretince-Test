import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const singletonTypes = ['homepage', 'loginPage']

export default defineConfig({
  name: 'default',
  title: 'Din Lokale turguide',

  projectId: 'ull4br8y',
  dataset: 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innhold')
          .items([
            S.listItem()
              .title('Hjemmeside')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.listItem()
              .title('Login Side')
              .child(
                S.document()
                  .schemaType('loginPage')
                  .documentId('loginPage')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.includes(item.getId()!)
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
