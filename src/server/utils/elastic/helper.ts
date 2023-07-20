import ElasticsearchUtil from './client';
const client = ElasticsearchUtil.getInstance();

// * Some query keywords with their meaning
// {
//     “query”:
//     {
//      “bool”: // * Used for complex queries
//         {
//       “must”: {
// *                 basically, AND condition in SQL queries.
//             },
//       “filter”: {
// *                  Another form of AND condition, But without scoring.
//             },
//       “should”: {
// *                  OR condition
//             },
//       “must_not”: {
// *                  NOR condition
//             }
//         }
//     }
// }

export async function createIndex() {
  try {
    const { body } = await client.indices.create({
      index: 'content_sample',
      body: {
        mappings: {
          properties: {
            domains: {
              type: 'nested'
            },
            contentType: {
              type: 'text'
            }
          }
        },
        settings: {
          index: {
            analysis: {
              analyzer: {
                facet_analyzer: {
                  type: 'custom',
                  tokenizer: 'keyword',
                  filter: ['lowercase']
                }
              }
            }
          }
        }
      }
    });

    console.log('Index created:', body);
  } catch (error) {
    console.error('An error occurred:', error);
  } 
}

// * Find all equivalent of MySQL
export async function getAllDocuments() {
  try {
    const data = await client.search({
      index: 'content_sample',
      body: {
        query: {
          match_all: {}
        }
      }
    });


    // const results = body.hits.hits.map(hit => hit._source);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  } 
}

// getAllDocuments();

// * Text search (searches relevant documents)
export async function getDocumentsByDomain(domainName = 'Language Learning') {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          match: {
            Domain: domainName
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// getDocumentsByDomain();

// * OR condition
export async function getDocumentsByContentTypeAndDomainName(
  contentType = 'Definition',
  domainName = 'Conceptual Knowledge'
) {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          bool: {
            // must: [
            //     { term: { "DOMAINS.keyword": domainName } },
            //     { term: { "CONTENT_TYPES.keyword": contentType } }
            // ]
            should: [
              { term: { 'DOMAINS.keyword': domainName } },
              { term: { 'CONTENT_TYPES.keyword': contentType } }
            ]
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// getDocumentsByContentTypeAndDomainName();

// * NOT condition
export async function getDocumentsNotHave(contentType = 'WebXR') {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          bool: {
            must_not: [
              // { term: { "DOMAINS.keyword": domainName } }
              // ,
              { term: { 'CONTENT_TYPES.keyword': contentType } }
            ]
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// getDocumentsNotHave();

// * Range condition
export async function getDocumentsByCreatedOnDateRange() {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          range: {
            CREATED_ON: {
              gte: '2017-01-01T00:00:00Z',
              lte: '2023-12-31T23:59:59Z'
            }
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// getDocumentsByCreatedOnDateRange();

// * Multiple range query condition example
export async function getDocumentsByUpdatedOnDateRange() {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        size: 20, // * Default size = 10
        query: {
          bool: {
            must: [
              {
                range: {
                  // * Range condition 1
                  CREATED_ON: {
                    gte: '2017-01-01T00:00:00Z',
                    lte: '2017-12-31T23:59:59Z'
                  }
                }
              },
              {
                range: {
                  // * Range condition 2
                  UPDATED_ON: {
                    gte: '2020-01-01T00:00:00Z',
                    lte: '2023-12-28T23:59:59Z'
                  }
                }
              }
            ]
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// getDocumentsByUpdatedOnDateRange();

// * Filter term query (using exact match of atleast one term on each document)
export async function getDocumentsContentTypeFilter() {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          bool: {
            filter: {
              term: {
                'CONTENT_TYPES.keyword': 'Formula Application' // * Matching here is case sensitive
              }
            }
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// getDocumentsContentTypeFilter()

// * Filter using terms query (for documents containing one of the multiple keywords)
export async function getDocumentsUsingMultipleTerm() {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          bool: {
            filter: {
              // must: {
              terms: { 'CONTENT_TYPES.keyword': ['Formula Application', 'Explanation'] }
            }
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// * Check existance of particular field
export async function checkFieldExistance() {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          exists: {
            field: 'CONT_TYPE'
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// checkFieldExistance()

// * Filter using terms with must query (for documents containing one of the multiple keywords)
export async function getDocumentsContentTypeHavingBothValues() {
  try {

    const documents = await getAllDocuments();
    const COUNT = documents.body.hits.total.value;
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          bool: {
            should: [
              {
                term: {
                  'CONTENT_TYPES.keyword': 'Formula Application'
                }
              },
              {
                term: {
                  'CONTENT_TYPES.keyword': 'Explanation'
                }
              }
            ]
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);

    return {SAMPLE_TOTAL_COUNT: COUNT, results};
  } catch (error) {
    console.error(error);
    throw error;
  } 
}

// getDocumentsContentTypeHavingBothValues();

// * To speed up term query and cached it.
export async function getDocumentUsingConstantScoreFilter() {
  try {
    const { body } = await client.search({
      index: 'content_sample',
      body: {
        query: {
          constant_score: {
            filter: {
              term: {
                'CONTENT_TYPES.keyword': 'Formula Application'
              }
            }
          }
        }
      }
    });

    const results = body.hits.hits.map(hit => hit._source);
    console.log(results);
  } catch (error) {
    console.error(error);
  } 
}

// getDocumentUsingConstantScoreFilter();
