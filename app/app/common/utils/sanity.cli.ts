import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'ull4br8y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})
