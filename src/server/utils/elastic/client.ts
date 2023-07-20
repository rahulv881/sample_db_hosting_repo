import { CONSTANT_CONFIG } from '../../../config/CONSTANT_CONFIG';
const { ELASTIC_SEARCH } = CONSTANT_CONFIG;
const { Client } = require('@opensearch-project/opensearch');

class ElasticsearchUtil {
  private static client;
  private ElasticsearchUtil() {}

  public static getInstance() {
    if (!ElasticsearchUtil.client) {
      ElasticsearchUtil.client = new Client({ node: ELASTIC_SEARCH.URL });
    }

    return ElasticsearchUtil.client;
  }

  public static async closeElasticsearchConnection() {
    try {
      console.log('Closing Elasticsearch connection...');
      const instance = ElasticsearchUtil.getInstance();
      await instance.close();
      console.log('Elasticsearch connection closed gracefully.');
    } catch (error) {
      console.error('Error closing Elasticsearch connection:', error);
    }
  }
}

export default ElasticsearchUtil;
