import * as prismic from '@prismicio/client'
import sm from './sm.json'

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

export function linkResolver(doc) {
  switch (doc.type) {
    case 'home-page':
      return '/'
    case 'place':
      return `/place`
    default:
      return null
  }
}

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  return client
}