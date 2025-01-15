# ELK Theory

### 1. **Introduction to Elasticsearch**

-   **Core Features**:

    -   **Near Real-Time Search**: Documents become searchable shortly after being indexed.
    -   **Full-Text Search**: Powered by Apache Lucene, Elasticsearch supports complex search queries.
    -   **Distributed**: Data is distributed across multiple nodes, ensuring scalability and fault tolerance.
    -   **RESTful API**: Interactions with Elasticsearch are performed via RESTful HTTP requests.
    -   **JSON Storage**: Data is stored in JSON format, making it flexible and easy to work with.

-   **ELK Stack**:
    -   **Elasticsearch**: Stores, searches, and analyzes data.
    -   **Logstash**: Aggregates, processes, and ingests data.
    -   **Kibana**: Visualizes and manages data.

---

###  2. **Key Concepts**

#### **Indices**

-   **Index**: A collection of documents with a similar structure. Indices are partitioned into **shards** for distributed storage and search.
-   **Inverted Index**: Elasticsearch uses an inverted index to map terms to the documents that contain them, enabling fast full-text search.

#### **Shards and Replicas**

-   **Shards**:
    -   **Primary Shards**: Handle write operations and store the original data.
    -   **Replica Shards**: Copies of primary shards stored on different nodes for fault tolerance and improved read performance.
-   **Replication**: Replicas increase fault tolerance and allow read operations to be distributed across multiple nodes.

#### **Mapping**

-   **Mapping**: Defines the structure of documents in an index, including field types and search behavior.
    -   **Dynamic Mapping**: Elasticsearch automatically detects and adds new fields to the mapping when documents are indexed.
    -   **Explicit Mapping**: Manually defined by the user to control the structure of the index.
-   **Field Types**: Elasticsearch supports various field types, including `text`, `keyword`, `date`, `integer`, `boolean`, `geo_point`, and more.

---

### 3. **Interactions with Elasticsearch**

-   **RESTful API**: Elasticsearch provides a RESTful API for interacting with the system.
    -   **HTTP Verbs**:
        -   **GET**: Retrieve documents, indices, or metadata.
        -   **POST**: Create new documents or indices (auto-generates IDs if not provided).
        -   **PUT**: Create or update documents or indices (requires an ID).
        -   **DELETE**: Remove documents or indices.
-   **Endpoints**: Requests can be sent via command line, tools like Postman, or Kibana’s developer tools.

---

### 4. **Querying in Elasticsearch**

#### **Query Context vs. Filter Context**

-   **Query Context**: Determines how well a document matches a query. Relevance scores are computed.
-   **Filter Context**: Determines whether a document matches a query. No relevance score is computed, and results are cacheable.

#### **Query Types**

-   **Leaf Query Clauses**: Simple queries that search for specific values in fields.
    -   **Match Query**: Searches for documents that match a provided text, number, date, or boolean value. Supports full-text search.
    -   **Term Query**: Searches for documents containing an exact term in a field. Suitable for structured data like keywords.
    -   **Range Query**: Searches for documents with values within a specified range (e.g., numbers or dates).
-   **Compound Query Clauses**: Combine multiple queries using logical operators.
    -   **Boolean Query**: Combines multiple queries using `must`, `should`, `must_not`, and `filter` clauses.
        -   **must**: All conditions must be true.
        -   **should**: At least one condition should be true.
        -   **must_not**: Conditions must not be true.
        -   **filter**: Conditions must be true, but no relevance score is computed.

---

### 5. **Aggregations**

-   **Aggregations**: Perform calculations on data and group documents into buckets.
    -   **Metric Aggregations**: Calculate metrics like sum, average, min, max, etc.
    -   **Bucket Aggregations**: Group documents into buckets based on field values, ranges, or other criteria.
    -   **Pipeline Aggregations**: Use the output of other aggregations as input.
-   **Sub-Aggregations**: Perform nested aggregations within buckets.

---

### 6. **Analyzers**

-   **Analyzers**: Process text fields to break them into terms for indexing and searching.
    -   **Standard Analyzer**: Splits text on word boundaries, removes punctuation, and lowercases terms.
    -   **Simple Analyzer**: Splits text on non-letter characters and lowercases terms.
    -   **Whitespace Analyzer**: Splits text on whitespace without lowercasing.
    -   **Language Analyzers**: Language-specific analyzers that handle stemming and stop words.
-   **Custom Analyzers**: Can be created if pre-built analyzers do not meet specific needs.

---

### 7. **Data Ingestion and Processing**

-   **Logstash**: A data processing pipeline that ingests, transforms, and sends data to Elasticsearch.
    -   **Input Plugins**: Collect data from various sources (e.g., Beats, databases, files).
    -   **Filter Plugins**: Process and enrich data (e.g., mutate, geoip, useragent).
    -   **Output Plugins**: Send data to destinations like Elasticsearch, databases, or other systems.
-   **Beats**: Lightweight data shippers that collect and send data to Logstash or Elasticsearch (e.g., Filebeat, Metricbeat).

---

### 8. **Kibana**

-   **Kibana**: A visualization tool for Elasticsearch data.
    -   **Dashboards**: Create interactive dashboards with various visualizations (e.g., graphs, maps, time series).
    -   **Lens**: A drag-and-drop tool for creating visualizations.
    -   **Maps**: Visualize geospatial data.
    -   **Time Series Visual Builder (TSVB)**: Perform advanced time series analysis.

---

### 9. **Best Practices**

-   **Shard Size**: Avoid too many small shards, as they increase overhead. Larger shards take longer to move.
-   **Mapping Updates**: Be cautious when updating mappings, as changes can invalidate existing data. Create a new index and reindex data if necessary.
-   **Query Optimization**: Use filters for exact matches and cacheable queries. Combine filters and queries for efficient searches.

---

### 10. **Comparison with Relational Databases**

-   **Elasticsearch vs. RDBMS**:
    -   **Table** → **Index**
    -   **Row** → **Document**
    -   **Column** → **Field**
    -   **Schema** → **Mapping**