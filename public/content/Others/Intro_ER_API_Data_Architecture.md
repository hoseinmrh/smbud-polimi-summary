# Summary of Theoretical Concepts (Intro, ER, API, Data Architecture)



## 1. Introduction

### 1.1 Data-Driven Decision Making

-   Companies now rely on data for decision-making, moving away from instinct-based decisions.
-   Data-driven decisions are more effective, predictable, and profitable.
-   Requires large amounts of well-organized and stored data.
-   Analytical capability depends on available data, which limits execution capability.

### 1.2 The Definition of Big Data

Big Data is characterized by the **4 V's**:

1. **Volume**: Ranges from Terabytes to Petabytes.
2. **Variety**: Includes structured (e.g., relational tables), semi-structured (e.g., JSON, XML), and unstructured data (e.g., text, multimedia).
3. **Velocity**: Continuous data streams requiring real-time or near-real-time analysis.
4. **Veracity**: Data can be imprecise and unpredictable, requiring management.

### 1.3 The Roles in the Data World

#### Data Scientist:

-   Extracts actionable insights from data.
-   Creates impactful data products.
-   Communicates business stories from data.
-   Builds confidence in data-driven decisions.

#### Data Engineer:

-   Builds and maintains data processing systems.
-   Operationalizes machine learning models.
-   Ensures data availability and usability in processing pipelines.
-   Focuses on the lifecycle of data and solution quality.

---

## 2. ER and Relational Data-Models

### 2.1. The Levels of Database Design:

#### 2.1.1. **Conceptual Database Design**

-   Focuses on constructing an **information model** for an enterprise.
-   Independent of physical considerations (e.g., storage, hardware).

#### 2.1.2. **Logical Database Design**

-   Builds an **organization database** based on a specific data model (e.g., relational, hierarchical).
-   Defines the structure and relationships of data.

#### 2.1.3. **Physical Database Design**

-   Implements the database using specific **storage structures** and **access methods**.
-   Focuses on optimizing performance and efficiency for data retrieval and storage.

### 2.2 Conceptual Design:

What to take into account:

-   Entities
-   Relationships
-   Attributes (simple, no composite, no - derived)
-   Attribute domains
-   Key attributes

### 2.3 Logical Design:

What to take into account:

-   **Review**
    -   Always binary with1 to many relationship
    -   No complex relationship
    -   No redundant relationship
    -   No recursive relationship
    -   No relationship with attribute(s)
-   **Normalize relations**

    -   Primary key
    -   Foreign key
    -   Normal form, BCNF

-   **Mapping logical database to DBMS**
    -   Base relations
    -   Integrity Rules
    -   Referential integrity (delete & update):
        -   No action
        -   Cascade
        -   Set null
        -   Set default
        -   No check

### 2.4 Physical Design

-   **Implementing physical representation**
    -   Analysis transactions
    -   File organization
    -   Indexes
    -   Disk space
    -   Security:
        -   Policy & procedure
        -   User view
        -   Access rules
    -   Transmission

## 3. API

### 1. **What is an API?**

-   **API (Application Program Interface)**: A set of routines, protocols, and tools for building software applications.
-   **WebAPI**: HTTP-based API for programmatic access to data and platforms.
-   **Scraping**: Used when no API is available.

---

### 2. **Why Use APIs?**

-   Separation between model and presentation.
-   Regulate access to data.
-   Traceable accounts.
-   Enable access to specific portions of data (by time, location, etc.).
-   Avoid direct access to platform websites.
-   Request throttling to prevent server congestion and DOS/DDOS attacks.
-   Provide paid access to full or higher-volume data.

---

### 3. **How APIs Work**

#### **URL Format**

-   Format: `scheme://user:password@[host[:port]][/path[?query][#fragment]]`
-   Example: `http://example.com`

#### **HTTP Requests**

-   Verbs: `GET`, `POST`, `DELETE`, `OPTIONS`, etc.
-   Example: `GET https://api.twitter.com/1.1/search/tweets.json`

#### **Endpoints**

-   APIs expose HTTP(s) endpoints to retrieve data or perform actions.
-   Examples:
    -   Retrieve data: `GET https://graph.facebook.com/search`
    -   Platform actions: `POST https://api.twitter.com/1.1/statuses/update.json`

#### **Parameters**

-   Parameters tweak endpoints via URL-encoded strings.
-   Example: `.../search/tweets.json?q=%23exp02015milano&lang=it&result_type=recent&count=100&token=1235abcd`

---

### 4. **RESTful APIs**

-   **REST (Representational State Transfer)**: A software architecture style.
    -   **Client-Server**: Separates clients from servers.
    -   **Stateless**: No client context stored on the server.
    -   **Cacheable**: Responses can be cached.
    -   **Layered System**: Clients may not know if they’re directly connected to the server.
    -   **Uniform Interface**: Simplifies and decouples architecture.

#### **RESTful API Operations**

-   **Collection**: A set of items (e.g., `/users`).
-   **Item**: A specific item in a collection (e.g., `/users/{id}`).
-   **Verbs**:
    -   `POST`: Create a new item in a collection.
    -   `GET`: Retrieve a list of elements or a specific item.
    -   `PUT`: Update a specific item.
    -   `DELETE`: Delete a specific item.

---

### 5. **Authentication**

-   Most APIs require user authentication.
-   **OAuth Protocol**: Commonly used for authentication.
    -   User registers to obtain a key and secret.
    -   Platform authenticates the user and provides a token for API access.

---

### 6. **Challenges**

#### **Crawling**

-   Problem: Getting large amounts of data from an API.
-   Solution: Use an API crawler to interact with the API methodically.

#### **Pagination**

-   Problem: Handling large chunks of data.
-   Solution: APIs split data into smaller, manageable sets.

#### **Timelines**

-   Problem: Social networks use timelines instead of standard pagination.
-   Solution: Use cursoring to read data relative to already processed IDs.

#### **Parallelization**

-   Problem: Gathering more data in less time.
-   Solution: Make parallel requests when possible.

#### **Multiple Accounts**

-   Problem: Handling multiple accounts to increase throughput.
-   Strategies:
    -   **Round Robin**: Rotate accounts for requests.
    -   **Account Pool**: Use accounts sequentially until rate limits are reached.
    -   **Requests Stack**: Accounts pull requests from a pool.

#### **Filling Gaps**

-   Problem: APIs may not provide all desired data.
-   Solution: Fill gaps in quantity, time, or quality (e.g., Twitter time-limited data, Foursquare check-ins).

---

### 7. **Key Takeaways**

-   APIs enable programmatic access to data and platforms.
-   RESTful APIs use HTTP verbs for CRUD operations.
-   Authentication (e.g., OAuth) is essential for API access.
-   Challenges include crawling, pagination, timelines, parallelization, and handling multiple accounts.
-   Use cases like UrbanScope demonstrate practical applications of APIs for data analysis.

---

## 4. Data Architecture Concepts

### **4.1 The Data Schema**

-   **Typing**: Ensures data types are consistent.
-   **Coherence**: Maintains logical consistency across the schema.
-   **Uniformity**: Ensures data is structured uniformly.

### **4.2 Transactions**

#### **Definition of Transaction**

-   An **elementary unit of work** performed by an application.
-   Encapsulated within two commands:
    -   `begin transaction` (bot)
    -   `end transaction` (eot)
-   Within a transaction, one of the following is executed:
    -   `commit work` (commit)
    -   `rollback work` (abort)
-   **Transactional System (OLTP)**: A system that provides transaction execution for multiple concurrent applications (as opposed to OLAP).

#### **Example of a Transaction**

```sql
begin transaction;
update Account set Balance = Balance + 10 where AccNum = 12202;
update Account set Balance = Balance - 10 where AccNum = 42177;
commit work;
end transaction;


#### **Well-formed Transactions**
- **Structure**:
  - `begin transaction`
  - Data manipulation (reads and writes)
  - `commit work` or `rollback work`
  - `end transaction`
- Ensures no data manipulation occurs outside the transaction.
```

### **4.3 Partitioning and Replication**

#### **Horizontal vs. Vertical Partitioning**

-   **Horizontal Partitioning**: Splits data by rows.
-   **Vertical Partitioning**: Splits data by columns.

#### **Data Partitioning**

-   **Aim**: Scalability and distribution.
-   Splits data into partitions stored across different nodes.
-   **Sharding**: A form of horizontal partitioning.

#### **Replication**

-   **Aim**: Fault tolerance and backup.
-   Copies the entire database across all nodes in a distributed system.

#### **Partitioning + Replication**

-   Combines the benefits of both:
    -   **Partitioning**: Fast data writing/reading, low memory overhead.
    -   **Replication**: Fast data reading, high data reliability.
-   **Cons**:
    -   Partitioning: Potential data loss.
    -   Replication: High network and memory overhead.

### **4.4 Scalability and Ingestion**

#### **Scalability**

-   **Key Questions**:
    -   How big is big?
    -   Not just scaling up (vertical scaling) but also scaling out (horizontal scaling).
    -   **Elasticity**: Ability to scale resources dynamically based on demand.

#### **Data Ingestion**

-   **Definition**: The process of importing, transferring, and loading data for storage and later use.
-   **Steps**:
    -   Load data from various sources.
    -   Alter/modify files to optimize storage (e.g., concatenate small files or break down large files into manageable sizes).

### **4.5 Data Wrangling**

-   **Definition**: The process of cleansing and transforming raw data into a format suitable for analysis.
-   **Steps**:
    1. **Understand**:
        - Identify data types (qualitative, quantitative, categorical).
        - Detect outliers and missing data.
    2. **Cleanse**:
        - Remove outliers.
        - Add missing values.
        - Transform quantitative values into categorical ones.
    3. **Augment**:
        - Aggregate data within one source.
        - Add data from other sources based on exact/fuzzy matches.
    4. **Shape**:
        - Format data optimally for analysis (e.g., columnar format).

### **4.6 Key Takeaways**

-   **Transactions**: Ensure atomicity, consistency, isolation, and durability (ACID properties).
-   **Partitioning and Replication**: Balance scalability, fault tolerance, and performance.
-   **Scalability**: Focus on elasticity and horizontal scaling.
-   **Data Ingestion**: Optimize data loading and storage.
-   **Data Wrangling**: Transform raw data into actionable insights through cleansing, augmentation, and shaping.
