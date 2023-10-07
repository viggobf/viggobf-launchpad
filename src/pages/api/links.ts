import * as cf from 'contentful'

var client = cf.createClient({
  space: 'k4tv5l9nc1ci',
  accessToken: 'Gf3rdq9o2mY7f48QgA6KRoMwzc9DJkhRkIaiDKbAJ9M'
})

export default async function getLinkArray() {
  var entries = await client.getEntries({
    content_type: 'launchpadLink'
  })

  return entries.items
}