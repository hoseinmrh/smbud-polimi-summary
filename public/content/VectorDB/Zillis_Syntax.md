# Zilliz Cheatsheet

This cheatsheet covers the essential syntax and operations for working with Zilliz using the `pymilvus` library. It includes collection management, data insertion, search operations, and more.

---

## 1. **Collection Management**

### 1.1. **Create a Collection**

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="CLUSTER_ENDPOINT",  # Cluster endpoint
    token="TOKEN"            # API key or username:password
)

# Create a collection with a simple setup
client.create_collection(
    collection_name="test_collection",
    dimension=5  # Dimension of the vector
)
```

### 1.2. **Drop a Collection**

```python
client.drop_collection(
    collection_name="test_collection"
)
```

### 1.3. **List Collections**

```python
collection_list = client.list_collections()
print(collection_list)
```

### 1.4. **Describe a Collection**

```python
collection_description = client.describe_collection(
    collection_name="test_collection"
)
print(collection_description)
```

### 1.5. **Load and Release a Collection**

```python
# Load a collection
client.load_collection(
    collection_name="test_collection"
)

# Release a collection
client.release_collection(
    collection_name="test_collection"
)
```

### 1.6. **Create a Collection with Multiple Vector Fields**

```python
# Create a collection with multiple vector fields
schema = client.create_schema(
    auto_id = False,
    enable_dynamic_field = True,
)

# Add primary key field to schema
schema.add_field(field_name = "custom_id", datatype = DataType.INT64, is_primary = True)

# Binary vector dimensions must be a multiple of 8
schema.add_field(field_name = "text_vector", datatype = DataType.BINARY_VECTOR, dim = 8)

schema.add_field(field_name = "image_vector", datatype = DataType.FLOAT_VECTOR, dim = 128)
```

### 1.7. **Manage Indexes**

```python
# Prepare index parameters
index_params = client.prepare_index_params()


# Add Index
index_params.add_index(
    field_name = "text_vector",
    # In Zilliz Cloud, the index type should always be `AUTOINDEX`.
    index_type = "AUTOINDEX",
    # For vector of the `BINARY_VECTOR` type, use `HAMMING` or `JACCARD` as the metric type.
    metric_type = "HAMMING",
    params = { "nlist": 128 }
)
client.create_index(
  collection_name = "index_collection", # Specify the collection name
  index_params = index_params
)

# Describe index
index_list = client.list_indexes(
    collection_name = "index_collection"
)

# Drop index
client.drop_index(
    collection_name = "index_collection",
    index_name = "vector_index"
)


```

### 1.8 **Manage Aliases**

```python
# Create alias
client.create_alias(
    collection_name = "custom_multiple_vector_field_collection",
    alias = "custom_alias"
)

# Collect aliases
aliases = client.list_aliases(
    collection_name = "custom_multiple_vector_field_collection"
)

# Describe alias
alias_desc = client.describe_alias(
    alias = "custom_alias"
)

# Alter Alias
client.alter_alias(
    collection_name = "custom_collection",
    alias = "another_custom_alias"
)

# Drop Alias
client.drop_alias(
    alias = "custom_alias"
)
```

---

## 2. **Data Insertion**

### 2.1. **Insert Data**

```python
data = [
    {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "color": "red"},
    {"id": 2, "vector": [0.6, 0.7, 0.8, 0.9, 1.0], "color": "blue"}
]

insert_status = client.insert(
    collection_name="test_collection",
    data=data
)

# Insert data into a specific partition
insert_partition_status = client.insert(
    collection_name = "quick_setup_collection",
    data = data,
    partition_name = "partition_1"
)
```

### 2.2. **Upsert (Update/Insert) Data**

```python
upsert_status = client.upsert(
    collection_name="test_collection",
    data=data  # Data to upsert
)
```

### 2.3. **Delete Data**

```python
delete_status = client.delete(
    collection_name="test_collection",
    filter="id in [1, 2]"  # Filter to delete specific entities
)

# Delete entities by id
delete_status = client.delete(
    collection_name = "quick_setup_collection",
    ids = [11, 12],
    partition_name = "partition_1"
)
```

---

## 3. **Search Operations**

### 3.1. **Single Vector Search**

```python
query_vector = [0.1, 0.2, 0.3, 0.4, 0.5]

search_result = client.search(
    collection_name="test_collection",
    data=[query_vector],
    limit=3,  # Number of results to return
    search_params={"metric_type": "IP", "params": {"level": 1}}
)
print(search_result)
```

### 3.2. **Batch Vector Search**

```python
bulk_query_vectors = [
    [0.1, 0.2, 0.3, 0.4, 0.5],
    [0.6, 0.7, 0.8, 0.9, 1.0]
]

bulk_search_result = client.search(
    collection_name="test_collection",
    data=bulk_query_vectors,
    limit=2,
    search_params={"metric_type": "IP", "params": {"level": 1}}
)
print(bulk_search_result)
```

### 3.3. **Partition Search**

```python
partition_search_result = client.search(
    collection_name="test_collection",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP", "params": {"level": 1}},
    partition_names=["partition_1"]
)
print(partition_search_result)
```

### 3.4. **Filtered Search**

```python
filtered_search_result = client.search(
    collection_name="test_collection",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP", "params": {"level": 1}},
    filter='color == "red"'
)
print(filtered_search_result)
```

---

## 4. **Partition Management**

### 4.1. **Create a Partition**

```python
client.create_partition(
    collection_name="test_collection",
    partition_name="partition_1"
)
```

### 4.2. **List Partitions**

```python
partitions = client.list_partitions(
    collection_name="test_collection"
)
print(partitions)
```

### 4.3. **Drop a Partition**

```python
client.drop_partition(
    collection_name="test_collection",
    partition_name="partition_1"
)
```

### 4.4. **Load and Release a Partition**

```python
# Load a partition
client.load_partitions(
    collection_name="test_collection",
    partition_names=["partition_1"]
)

# Release a partition
client.release_partitions(
    collection_name="test_collection",
    partition_names=["partition_1"]
)
```

---

## 5. **Advanced Search Operations**

### 5.1. **Hybrid Search**

```python
from pymilvus import AnnSearchRequest, WeightedRanker

# Create ANN search requests
request_film = AnnSearchRequest(
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],
    anns_field="filmVector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=2
)

request_poster = AnnSearchRequest(
    data=[[0.6, 0.7, 0.8, 0.9, 1.0]],
    anns_field="posterVector",
    param={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=2
)

# Perform hybrid search
rerank = WeightedRanker(0.8, 0.2)  # Weighted ranker
search_results = collection.hybrid_search(
    requests=[request_film, request_poster],
    rerank=rerank,
    limit=2
)
print(search_results)
```

---

## 6. **Query Operations**

### 6.1. **Get Entities by ID**

```python
entities = client.get(
    collection_name="test_collection",
    ids=[1, 2]
)
print(entities)
```

### 6.2. **Basic Filtering Queries**

```python
query_result = client.query(
    collection_name="test_collection",
    filter='color == "red"',
    output_fields=["color"],
    limit=3
)
print(query_result)
```

### 6.3. **Advanced Queries**

```python
advanced_query_result = client.query(
    collection_name="test_collection",
    filter='color == "red" and tag > 1000',
    output_fields=["color_tag"],
    limit=3
)


# Count
advanced_operator_result = client.query(
    collection_name = "quick_setup_collection",
    output_fields = ["count(*)"]
)


# Count the number of entities in a partition
advanced_operator_result = client.query(
    collection_name = "quick_setup_collection",
    output_fields = ["count(*)"],
    partition_names = ["partition_1"]
)


# Count the number of entities that match a specific filter
advanced_operator_result = client.query(
    collection_name = "quick_setup_collection",
    filter = '(color == "red") and (1000 < tag < 1500)',
    output_fields = ["count(*)"],
)

```

## 6.4 **Search and Query With Iterators**

```python

# Search with iterators
query_vectors = [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]]
search_params = {
    "metric_type": "IP",
    "params": {"nprobe": 10}
}

iterator = collection.search_iterator(
    data = query_vectors,
    anns_field = "vector",
    batch_size = 10, # Number of elements per page returned with .next()
    param = search_params,
    output_fields = ["color_tag"],
    limit = 3
)

results = []

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break

    for hit in result:
        results.append(hit.to_dict())


# Query with iterator
iterator = collection.query_iterator(
    batch_size = 10,
    expr = "color_tag like \"brown_8%\"",
    output_fields = ["color_tag"]
)

results = []

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break

    results += result
```

---
