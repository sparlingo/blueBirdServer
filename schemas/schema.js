// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import my schemas, baseball related ones
import hitter from './hitter'
import hitterSeasonStats from './hitterSeasonStats'
import hitterCareerStats from './hitterCareerStats'
import person from './person'
import pitcher from './pitcher'
import pitcherSeasonStats from './pitcherSeasonStats'
import pitcherCareerStats from './pitcherCareerStats'

// Import blog shchemas
import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'playerSchema',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    person,
    pitcher,
    hitter,
    hitterSeasonStats,
    hitterCareerStats,
    pitcherSeasonStats,
    pitcherCareerStats,
    post,
    author,
    category,
    blockContent
  ])
})
