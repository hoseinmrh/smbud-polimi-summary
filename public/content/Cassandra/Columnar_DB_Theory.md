#  Columnar Databases

### Overview

-   **NoSQL Family**: Includes Document, Graph, Key-Value, and Wide Column Stores.
-   **Wide Column Stores**: Examples include Cassandra, HBase, and BigTable.
-   **Use Cases**: OLAP (Online Analytical Processing), Data Mining, and large-scale data repositories.

### Issues with Traditional Databases

-   **Challenges**: Large, unstructured data, random reads/writes, and lack of foreign keys.
-   **Needs**: Incremental scalability, speed, no single point of failure, low cost, and scale-out architecture.

### CAP Theorem

-   **CAP**: Consistency, Availability, Partition-tolerance. Systems can guarantee only two out of three.
-   **Cassandra**: Prioritizes Availability and Partition-tolerance with eventual consistency.

### Column Storage

-   **Row-store vs Column-store**:
    -   **Row-store**: Easy to add/modify records, but may read unnecessary data.
    -   **Column-store**: Efficient for read-intensive operations, only reads relevant data.
-   **Pros**: Data compression, improved bandwidth utilization, better cache locality.
-   **Cons**: Increased disk seek time, higher cost of inserts, and tuple reconstruction costs.

### Compression

-   **Techniques**: Run-length encoding, higher data value locality.
-   **Benefits**: Trades I/O for CPU, reduces storage requirements.

### List of Columnar Databases

-   **Examples**: Cassandra, Vertica, SybaseIQ, C-Store, BigTable, MonetDB, LucidDB.

---

### 1. Cassandra

#### 1.1 Overview

-   **Origin**: Originally designed at Facebook, now an open-source project under the Apache Foundation.
-   **Data Model**: Combines Google’s BigTable (sparse, distributed data storage) and Amazon’s Dynamo (distributed key-value store).
-   **Use Cases**: Used by companies like Netflix, Spotify, and Adobe for large-scale, distributed data storage.

#### 1.2 Data Model

-   **Keyspace**: Equivalent to a database in SQL, typically one per application.
-   **Column Families**: Similar to SQL tables but can be unstructured. Each row in a column family can have different columns.
-   **Columns**: Composed of three parts:
    -   **Name**: Byte array, determines sort order.
    -   **Value**: Byte array, the actual data.
    -   **Timestamp**: Used for conflict resolution (last write wins).
-   **Super Columns**: Group multiple columns under a common name, useful for denormalization.

#### 1.3 Query Model

-   **Cassandra vs RDBMS**:
    -   **RDBMS**: Domain-based model (what answers do I have?).
    -   **Cassandra**: Query-based model (what questions do I have?).
-   **Indexing**: Supports secondary indexes and denormalization for query optimization.
-   **Query Operations**:
    -   **get()**: Retrieve a specific column or super column.
    -   **get_slice()**: Retrieve multiple columns in a row.
    -   **multiget_slice()**: Retrieve slices for multiple keys.
    -   **get_range_slices()**: Retrieve columns across a range of keys.

#### 1.4 Write and Read Operations

-   **Writes**:
    -   Lock-free and fast.
    -   Writes are logged in a commit log and stored in memory (memtable) before being flushed to disk (SSTable).
    -   **Hinted Handoff**: If a replica is down, the coordinator node stores the write and forwards it when the replica comes back online.
-   **Reads**:
    -   Slower than writes due to consistency checks.
    -   **Read Repair**: If inconsistencies are found between replicas, Cassandra repairs them in the background.
-   **Quorums**:
    -   Configurable consistency levels: ANY, ONE, QUORUM, LOCAL_QUORUM, EACH_QUORUM, ALL.
    -   **Quorum Formula**: \( Q = N/2 + 1 \), where \( N \) is the total number of replicas.

#### 1.5 Cluster Management

-   **Gossip Protocol**: Nodes exchange information about cluster state, ensuring fault tolerance and high availability.
-   **Replica Placement**:
    -   **Simple Strategy**: Replicas are placed in a ring within a single datacenter.
    -   **Network Topology Strategy**: Replicas are placed across multiple datacenters and racks for fault tolerance.
-   **Bloom Filters**: Used to quickly check if a key exists in an SSTable, reducing disk I/O.

#### 1.6 Properties

-   **Tuneable Consistency**: Allows configuring consistency levels for each operation.
-   **High Availability**: No single point of failure, always-on architecture.
-   **Scalability**: Linear, elastic scalability with decentralized architecture.
-   **Fault Tolerance**: Data is replicated across multiple nodes and datacenters.

#### 1.7 Performance

-   **Writes**: Extremely fast (0.12 ms avg) due to lock-free architecture.
-   **Reads**: Fast (15 ms avg), but slower than writes due to consistency checks and read-repair.

#### 1.8 Use Cases

-   **Good Fit**: Applications requiring fast writes, large datasets (>GBs), and high availability.
-   **Not Ideal**: Applications requiring complex joins or strong consistency.

---

### 2. HBase

#### 2.1 Overview

-   **Origin**: Based on Google’s BigTable, open-sourced by Yahoo!, and now part of the Apache Hadoop ecosystem.
-   **Data Model**: A distributed, column-oriented database designed for large-scale data storage.
-   **Use Cases**: Used by companies like Facebook for real-time read/write access to large datasets.

#### 2.2 Data Model

-   **Tables**: Split into multiple regions, which are distributed across servers.
-   **Regions**: Each region contains Stores for ColumnFamilies.
    -   **MemStore**: In-memory storage for recent writes.
    -   **StoreFile**: On-disk storage (HFile) for persisted data.
-   **HFile**: The underlying storage format, similar to Google’s SSTable.

#### 2.3 Write and Read Operations

-   **Writes**:
    -   **Write-Ahead Log (WAL)**: All writes are first logged to ensure durability.
    -   **MemStore**: Writes are stored in memory before being flushed to disk.
    -   **Compaction**: Merges multiple StoreFiles to reduce read overhead.
-   **Reads**:
    -   Data is read from both MemStore and StoreFiles.
    -   **Bloom Filters**: Used to quickly check if a key exists in an HFile.

#### 2.4 Consistency

-   **Strong Consistency**: HBase guarantees strong consistency by using a master-slave architecture.
-   **Write-Ahead Log (WAL)**: Ensures durability and recovery in case of failures.
-   **Log Replay**: During recovery, stale logs are replayed to ensure data consistency.

#### 2.5 Cluster Management

-   **HMaster**: Manages metadata and region assignments.
-   **HRegionServer**: Handles read/write requests for regions.
-   **Zookeeper**: Manages cluster coordination and failure detection.

#### 2.6 Properties

-   **Strong Consistency**: HBase prioritizes consistency over availability.
-   **Scalability**: Scales horizontally by adding more region servers.
-   **Integration with Hadoop**: Seamlessly integrates with Hadoop for large-scale data processing.

#### 2.7 Performance

-   **Writes**: Fast, but slower than Cassandra due to strong consistency guarantees.
-   **Reads**: Efficient for range queries and scans.

#### 2.8 Use Cases

-   **Good Fit**: Applications requiring strong consistency, real-time read/write access, and integration with Hadoop.
-   **Not Ideal**: Applications requiring high availability and eventual consistency.

---

### 3 Comparison: Cassandra vs HBase

| Feature               | Cassandra                       | HBase                                  |
| --------------------- | ------------------------------- | -------------------------------------- |
| **Consistency Model** | Eventual consistency (tuneable) | Strong consistency                     |
| **Architecture**      | Decentralized, masterless       | Master-slave architecture              |
| **Write Speed**       | Extremely fast (0.12 ms avg)    | Fast, but slower than Cassandra        |
| **Read Speed**        | Fast (15 ms avg)                | Efficient for range queries            |
| **Scalability**       | Linear, elastic scalability     | Scales horizontally                    |
| **Use Cases**         | High availability, fast writes  | Strong consistency, Hadoop integration |

---

### 4 Other Columnar Databases

#### 4.1 MonetDB

-   **Features**: SQL and ODMG front-ends, full vertical fragmentation for column storage.
-   **Use Cases**: OLAP and data mining.

### 4.2 LucidDB

-   **Storage**: Column-store tables with compressed column values.
-   **Indexing**: B-tree index for mapping row IDs to page IDs.
