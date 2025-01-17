# MongoDB Theory

### 1. **Sharding**

A key concept in NoSQL databases, which involves partitioning data across multiple servers. It is fully automatic, configurable, and transparent, following the **BASE principles** (Basically Available, Soft state, Eventually consistent).

### 2. **Sharding in NoSQL**

-   **Sharding** is used to:
    -   **Scale** applications to handle massive workloads and data volumes.
    -   Support **Geo-Locality** for geographically distributed deployments.
    -   Optimize **hardware performance** and reduce **recovery times**.
-   **Shard Key**: A key defined by the data modeler that partitions data into chunks, which are distributed across multiple servers.

### 3. **Document-Oriented Databases**

-   **MongoDB** is a popular document-oriented database that stores data in **JSON-like documents**.
-   **Advantages**:
    -   Handles **schema changes** well.
    -   Solves the **impedance mismatch** problem between object-oriented programming and relational databases.
    -   Supports **dynamic schemas**, making it flexible for agile development.

### 4. **MongoDB Overview**

-   **MongoDB** is an open-source, document-oriented database designed for **scalability** and **developer agility**.
-   **Key Features**:
    -   **Rich data model**: Supports complex data structures.
    -   **Full-featured indexes**: Improves query performance.
    -   **Sophisticated query language**: Allows for powerful data retrieval.
    -   **Automatic sharding**: Distributes data across multiple servers.
    -   **Dynamic schema**: Allows for flexible data modeling.

### 6. **MongoDB Data Model**

-   **Collections**: A collection in MongoDB is a group of documents.
-   **Documents**: Each document is a JSON-like structure with key-value pairs.
-   **Embedded Documents**: Documents can contain other documents, allowing for nested data structures.
-   **Referenced Documents**: Documents can reference other documents, similar to foreign keys in relational databases.

### 7. **Designing NoSQL Data Structures**

-   NoSQL data structures are driven by **application design** and the need for efficient **CRUD operations** (Create, Read, Update, Delete).
-   **Embedding vs. Referencing**:
    -   **Embedding** is preferred when possible, as it reduces the need for joins and improves performance.
    -   **Referencing** is used when data needs to be shared across multiple documents.

### 8. **Sharding in MongoDB**

-   **Sharding Strategies**:
    -   **Range Sharding**: Data is partitioned based on a range of values.
    -   **Hash Sharding**: Data is distributed using a hash function.
    -   **Tag Sharding**: Data is assigned to specific shards based on tags.
-   **Auto-Sharding**: MongoDB automatically balances data across shards and migrates data when necessary.

### **Comparison**

| **Strategy**  | **Strengths**                                                        | **Weaknesses**                                                 |
| ------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Ranged**    | Efficient for range queries.                                         | Can lead to unbalanced data distribution with skewed datasets. |
| **Hashed**    | Ensures even data distribution across shards.                        | Inefficient for range-based queries.                           |
| **Tag-Aware** | Supports custom distribution based on logical or geographical needs. | Complex to plan and manage; may result in uneven shard usage.  |

### 9. **CAP Theorem and MongoDB**

-   MongoDB focuses on **Consistency** and **Partition Tolerance** (CP).
-   **Consistency**: All replicas contain the same version of the data.
-   **Partition Tolerance**: The system remains operational even if network partitions occur.

### 10. **MongoDB Processes**

-   **Mongod**: The main database process that handles data storage and retrieval.
-   **Mongos**: A sharding router that directs queries to the appropriate shards.
-   **Mongo Shell**: An interactive JavaScript shell for interacting with MongoDB.
