# Veative-RMS

# Elastic Search

## Document Field Classification:

    - Headline: Exact Values and Analyzed Text
    In document classification, fields can be categorized as exact values or analyzed text. Exact values refer to fields like user_id, date, email_addresses, etc. On the other hand, analyzed text refers to fields containing text data such as product_description or email_body. For example, if a document's analyzed text includes "Johnny Depp," it should also be returned in searches for "John Depp" or "Johnnie Depp." Similarly, a search for "cook" should also return results for "cooking" and "cooked."

## Query Syntax:

    - Headline: Query Clause Structure
    - Description: The syntax for constructing queries follows a specific structure. It consists of a query clause enclosed in curly braces. The query clause can contain one or more field-specific arguments with their corresponding values. There are two variations of the syntax: one with a general query clause and another with a field-specific query clause.
```
{
  QUERY_CLAUSE: {
    ARGUMENT: VALUE,
    ARGUMENT: VALUE,...
  }
}
```

```
{
  QUERY_CLAUSE: {
    FIELD_NAME: {
      ARGUMENT: VALUE,
      ARGUMENT: VALUE,...
    }
  }
}
```


## Match Query Clause:

    - Headline: Match Query for Analyzed Text
    - Description: The match query clause is a smart way to query analyzed text fields. It allows you to search for a specific value within an analyzed text field. For example, the given query searches for documents where the "CONT_TITLE" field contains the term "SYSTEMS."
    - Example: 
```{
  "query": {
    "match": {
      "CONT_TITLE": "SYSTEMS"
    }
  }
}
```

## Match All Query Clause:

    - Headline: Match All Query
    - Description: The match all query clause is used to retrieve all documents from the index. It does not apply any filtering or search criteria. Simply put, it returns every document available.
    - Example:
```
{
  "query": {
    "match_all": {}
  }
}
```

## Term Query Clause:

    - Headline: Term Query for Exact Value Fields
    - Description: The term query clause is used to filter documents based on exact value fields. It allows you to filter by a single value. In the provided query, the "CONTENT_TYPES.keyword" field is filtered to include documents with values "Formula Application" or "Explanation."
    - Example: 
```
{
  "query": {
    "bool": {
      "filter": {
        "terms": {
          "CONTENT_TYPES.keyword": ["Formula Application", "Explanation"]
        }
      }
    }
  }
}
```

## Terms Query Clause:

    - Headline: Terms Query for Multiple Values
    - Description: The terms query clause is used to filter documents based on multiple values. It performs an OR logical connection between the values. In the given query, the "CONTENT_TYPES.keyword" field is filtered to include documents with values "Formula Application" or "Explanation."
    - Example: 
```
{
  "query": {
    "bool": {
      "filter": {
        "terms": {
          "CONTENT_TYPES.keyword": ["Formula Application", "Explanation"]
        }
      }
    }
  }
}
```


## Exists Query Clause:

    - Headline: Exists Query for Field Existence
    - Description: The exists query clause checks whether a particular field exists in the document schema. It is similar to the "IS NOT NULL" condition in SQL. The provided query checks for the existence of the "CONT_TYPE" field.
    - Example:
```
{
  "query": {
    "exists": {
      "field": "CONT_TYPE"
    }
  }
}
```


## Range Query Clause:

    - Headline: Range Query for Numeric or Date Ranges
    - Description: The range query clause is used to filter documents within a specified numeric or date range. In the given query, documents are filtered based on the "CREATED_ON" field, which should be greater than or equal to "2017-01-01T00:00:00Z" and less than or equal to "2023-12-31T23:59:59Z."
    - Example: 
```
{
  "query": {
    "range": {
      "CREATED_ON": {
        "gte": "2017-01-01T00:00:00Z",
        "lte": "2023-12-31T23:59:59Z"
      }
    }
  }
}
```


## Bool Query Clause:

    - Headline: Bool Query for Combining Query Clauses
    - Description: The bool query clause allows the combination of multiple query clauses using boolean operators. The supported operators are must, must_not, and should, corresponding to AND, NOT, and OR operations, respectively. The provided query demonstrates the use of the bool query clause with range conditions for "CREATED_ON" and "UPDATED_ON" fields.
    - Example: 
```
{
  "query": {
    "bool": {
      "must": [
        {
          "range": {
            "CREATED_ON": {
              "gte": "2017-01-01T00:00:00Z",
              "lte": "2017-12-31T23:59:59Z"
            }
          }
        },
        {
          "range": {
            "UPDATED_ON": {
              "gte": "2020-01-01T00:00:00Z",
              "lte": "2023-12-28T23:59:59Z"
        }
          }
        }
      ]
    }
  }
}
```

To be continue...