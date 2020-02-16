// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import my schemas
import person from './person'
import position from './position'
import pitcher from './pitcher'
import hitter from './hitter'
import hitterSeason from './hitterSeason'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'playerSchema',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    person,
    position,
    pitcher,
    hitter,
    hitterSeason
  ])
})
