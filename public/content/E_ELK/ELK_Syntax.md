# Elastic Search Cheatsheet

### 1. **Index Operations**

#### **Create an Index**

To create a new index, use the `PUT` method. You can also specify settings like the number of shards and replicas.

```json
PUT /my_index
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  }
}
```

#### **Create an Index with Explicit Mapping**

You can define the mapping (field types) when creating an index.

```json
PUT /my_index
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "age": { "type": "integer" },
      "email": { "type": "keyword" }
    }
  }
}
```

#### **Add a Field to an Existing Mapping**

To add a new field to an existing index, use the `PUT` method with the `_mapping` endpoint.

```json
PUT /my_index/_mapping
{
  "properties": {
    "surname": { "type": "text" }
  }
}
```

---

### 2. **Document Operations**

#### **Index a Document**

To add a document to an index, use the `POST` or `PUT` method. `POST` auto-generates an ID, while `PUT` requires an ID.

```json
POST /my_index/_doc
{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com"
}
```

```json
PUT /my_index/_doc/1
{
  "name": "Jane Doe",
  "age": 25,
  "email": "jane.doe@example.com"
}
```

#### **Retrieve a Document**

To retrieve a document by its ID, use the `GET` method.

```json
GET /my_index/_doc/1
```

#### **Delete a Document**

To delete a document by its ID, use the `DELETE` method.

```json
DELETE /my_index/_doc/1
```

---

### 3. **Search Queries**

#### **Match Query**

The `match` query is used for full-text search. It analyzes the text before matching.

```json
GET /my_index/_search
{
  "query": {
    "match": {
      "name": "John Doe"
    }
  }
}
```

#### **Term Query**

The `term` query is used for exact matches, typically on keyword fields.

```json
GET /my_index/_search
{
  "query": {
    "term": {
      "email": {
        "value": "john.doe@example.com"
      }
    }
  }
}
```

#### **Range Query**

The `range` query is used to find documents with values within a specified range.

```json
GET /my_index/_search
{
  "query": {
    "range": {
      "age": {
        "gte": 20,
        "lte": 30
      }
    }
  }
}
```

#### **Boolean Query**

The `bool` query allows you to combine multiple queries using logical operators (`must`, `should`, `must_not`, `filter`).

```json
GET /my_index/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "John" } }
      ],
      "filter": [
        { "range": { "age": { "gte": 20, "lte": 30 } } }
      ]
    }
  }
}
```

---

### 4. **Aggregations**

#### **Bucket Aggregation**

Group documents into buckets based on field values.

```json
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "age_groups": {
      "terms": {
        "field": "age"
      }
    }
  }
}
```

#### **Metric Aggregation**

Calculate metrics like average, sum, min, max, etc.

```json
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "average_age": {
      "avg": {
        "field": "age"
      }
    }
  }
}
```

#### **Sub-Aggregation**

Perform nested aggregations within buckets.

```json
GET /my_index/_search
{
  "size": 0,
  "aggs": {
    "age_groups": {
      "terms": {
        "field": "age"
      },
      "aggs": {
        "average_salary": {
          "avg": {
            "field": "salary"
          }
        }
      }
    }
  }
}
```

---

### 5. **Analyzer Testing**

You can test how an analyzer processes text using the `_analyze` endpoint.

```json
POST /_analyze
{
  "analyzer": "standard",
  "text": "The quick brown fox jumps over the lazy dog."
}
```

---

### 6. **Multi-Index Search**

You can search across multiple indices at once.

```json
GET /index1,index2/_search
{
  "query": {
    "match": {
      "name": "John"
    }
  }
}
```

---

### 7. **Filtering**

Filters are used for exact matches and do not compute relevance scores.

```json
GET /my_index/_search
{
  "query": {
    "bool": {
      "filter": [
        { "term": { "email": "john.doe@example.com" } }
      ]
    }
  }
}
```

---

### 8. **Date Math**

Elasticsearch supports date math for range queries involving dates.

```json
GET /my_index/_search
{
  "query": {
    "range": {
      "publish_date": {
        "gte": "now-10d/d",
        "lte": "now"
      }
    }
  }
}
```

---

### 9. **Combining Queries and Filters**

You can combine queries and filters for more efficient searches.

```json
GET /my_index/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "John" } }
      ],
      "filter": [
        { "range": { "age": { "gte": 20, "lte": 30 } } }
      ]
    }
  }
}
```

---

### 10. **Count Documents**

You can count the number of documents that match a query.

```json
GET /my_index/_count
{
  "query": {
    "match": {
      "name": "John"
    }
  }
}
```
