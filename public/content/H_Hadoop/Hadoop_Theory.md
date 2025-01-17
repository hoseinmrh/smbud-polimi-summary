# 1. Hadoop & HDFS Cheatsheet

## Overview of Hadoop

-   **Hadoop** is a software platform for processing vast amounts of data.
-   **Components**:
    -   **MapReduce**: Offline computing engine.
    -   **HDFS**: Hadoop Distributed File System.
    -   **HBase**: Online data access.
-   **Features**:
    -   **Scalable**: Handles petabytes of data.
    -   **Economical**: Uses clusters of commonly available computers.
    -   **Efficient**: Processes data in parallel on nodes where data is located.
    -   **Reliable**: Maintains multiple copies of data and redeploys tasks on failures.

## Hadoop Assumptions

-   Hardware will fail.
-   Processing is batch-oriented (high throughput, not low latency).
-   Files in HDFS are large (gigabytes to terabytes).
-   **Write-once-read-many** access model.
-   Moving computation is cheaper than moving data.

## Hadoop Ecosystem

-   **Components**:
    -   **Ambari**: Provisioning, managing, and monitoring Hadoop clusters.
    -   **Sqoop**: Data exchange.
    -   **YARN**: Resource management.
    -   **HDFS**: Distributed file system.
    -   **Hive, Pig, HBase, Zookeeper, Flume, Hue, Oozie**: Additional tools for data processing and management.

## RDBMS vs. Hadoop

| Feature             | RDBMS               | Hadoop                        |
| ------------------- | ------------------- | ----------------------------- |
| Data Size           | Gigabytes           | Petabytes                     |
| Access              | Interactive & Batch | Batch                         |
| Updates             | Read & Write Many   | Write Once, Read Many         |
| Integrity           | High                | Low                           |
| Scaling             | Non-Linear          | Linear                        |
| Data Representation | Structured          | Unstructured, Semi-structured |

## Hadoop Distributions

-   **Cloudera Distribution for Hadoop (CDH)**.
-   **MapR Distribution**.
-   **Hortonworks Data Platform (HDP)**.
-   **Oracle Big Data Appliance**.

## Hadoop 1.0 Limitations

-   Scalability: Max cluster size of 4,000 nodes.
-   Single point of failure: JobTracker failure kills all jobs.
-   Coarse synchronization in JobTracker.

## Hadoop 2.0 (YARN)

-   **YARN** splits resource management and job scheduling.
-   **Components**:
    -   **Resource Manager**: Manages cluster resources.
    -   **Application Master**: Manages job lifecycle.
    -   **NodeManager**: Manages node resources.
-   **Benefits**:
    -   Scalability: Supports clusters of 6,000-10,000 nodes.
    -   Fault tolerance: No single point of failure.
    -   Multi-tenancy: Supports multiple frameworks (e.g., Spark, HBase).

## HDFS Overview

-   **HDFS** is a distributed file system for storing large datasets.
-   **Features**:
    -   Files split into blocks (default 64MB).
    -   Blocks replicated across nodes (default 3 replicas).
    -   Optimized for batch processing and high aggregate bandwidth.

## HDFS Architecture

-   **NameNode**: Manages file system namespace and metadata.
-   **DataNode**: Stores data blocks and serves data to clients.
-   **Secondary NameNode**: Merges FSImage and Transaction Log to reduce NameNode load.

## HDFS Operations

-   **Read Operation**:
    -   Client contacts NameNode for block locations.
    -   Reads data directly from DataNodes.
-   **Write Operation**:
    -   Client writes data to a pipeline of DataNodes.
    -   Data is replicated across multiple nodes.

## HDFS Security

-   **Authentication**:
    -   Simple: Uses OS username.
    -   Kerberos: Secure authentication.
-   **Permissions**: POSIX-like (read, write, execute).
-   **ACLs**: Additional permissions for users and groups.

## MapReduce Overview

-   **MapReduce** is a programming model for processing large datasets.
-   **Phases**:
    -   **Map**: Processes input data and emits key-value pairs.
    -   **Reduce**: Aggregates values for each key.
-   **Advantages**:
    -   Automatic parallelization and distribution.
    -   Fault tolerance and load balancing.

## MapReduce Workflow

1. **Input Splitter**: Splits input data into chunks.
2. **Mapper**: Processes each chunk and emits intermediate key-value pairs.
3. **Shuffle & Sort**: Groups intermediate data by key.
4. **Reducer**: Aggregates values for each key and produces output.

## MapReduce Components

-   **Mapper**: Reads input data and emits key-value pairs.
-   **Reducer**: Aggregates values for each key.
-   **Partitioner**: Determines which reducer processes each key.
-   **Combiner**: Optional local reducer to reduce data transfer.
-   **Output Committer**: Writes final output to HDFS.

## MapReduce Execution

-   **Map Phase**:
    -   Input data is split into chunks.
    -   Map tasks process chunks in parallel.
-   **Reduce Phase**:
    -   Intermediate data is shuffled and sorted.
    -   Reduce tasks aggregate data and produce output.

## Fault Tolerance in MapReduce

-   **Worker Failure**: Tasks are re-executed on other nodes.
-   **Master Failure**: Rare, but can be recovered from checkpoints.
-   **Speculative Execution**: Runs backup tasks for slow nodes.

## MapReduce Optimizations

-   **Combiners**: Reduce data transfer by aggregating data locally.
-   **Compression**: Compress intermediate and output data.
-   **Counters**: Track events and metrics during job execution.
-   **Speculative Execution**: Run backup tasks for slow nodes.
-   **Zero Reduces**: Skip reduce phase if only filtering is needed.

## Scheduling in Hadoop

-   **FIFO Scheduler**: Default scheduler, processes jobs in order.
-   **Capacity Scheduler**: Allocates resources to queues.
-   **Fair Scheduler**: Provides fast response times for small jobs.

## Conclusion

-   Hadoop provides a scalable, efficient, and reliable platform for big data processing.
-   HDFS offers distributed storage with high fault tolerance.
-   MapReduce simplifies parallel processing by handling distribution, fault tolerance, and load balancing.

---

# 2. Hadoop & MapReduce Cheatsheet

## Overview of MapReduce

-   **MapReduce** is a programming model for processing large datasets in parallel across distributed systems.
-   **Key Concepts**:
    -   **Map**: Processes input data and emits key-value pairs.
    -   **Reduce**: Aggregates values for each key.
    -   **Shuffle & Sort**: Intermediate step that groups data by key before reduction.

## MapReduce Workflow

1. **Input Splitter**: Splits input data into chunks (default 64MB).
2. **Mapper**: Processes each chunk and emits intermediate key-value pairs.
3. **Shuffle & Sort**: Groups intermediate data by key.
4. **Reducer**: Aggregates values for each key and produces output.

## Key Components of MapReduce

-   **Input Splitter**: Splits input data into chunks for parallel processing.
-   **Mapper**: Processes input data and emits key-value pairs.
-   **Reducer**: Aggregates values for each key.
-   **Partitioner**: Determines which reducer processes each key.
-   **Combiner**: Optional local reducer to reduce data transfer.
-   **Output Committer**: Writes final output to HDFS.

## MapReduce Execution

-   **Map Phase**:
    -   Input data is split into chunks.
    -   Map tasks process chunks in parallel.
-   **Reduce Phase**:
    -   Intermediate data is shuffled and sorted.
    -   Reduce tasks aggregate data and produce output.

## Fault Tolerance in MapReduce

-   **Worker Failure**: Tasks are re-executed on other nodes.
-   **Master Failure**: Rare, but can be recovered from checkpoints.
-   **Speculative Execution**: Runs backup tasks for slow nodes.

## MapReduce Optimizations

-   **Combiners**: Reduce data transfer by aggregating data locally.
-   **Compression**: Compress intermediate and output data.
-   **Counters**: Track events and metrics during job execution.
-   **Speculative Execution**: Run backup tasks for slow nodes.
-   **Zero Reduces**: Skip reduce phase if only filtering is needed.

## Scheduling in Hadoop

-   **FIFO Scheduler**: Default scheduler, processes jobs in order.
-   **Capacity Scheduler**: Allocates resources to queues.
-   **Fair Scheduler**: Provides fast response times for small jobs.

## New Trends in MapReduce

-   **Disk-locality Irrelevant**: Assumes network speeds exceed disk speeds.
-   **Memory-locality**: Next step to improve performance by leveraging memory.

## Comparison with Previous Hadoop Cheatsheet

-   **Focus on MapReduce**: This cheatsheet focuses more on the MapReduce model, its components, and optimizations.
-   **Detailed Workflow**: Provides a more detailed breakdown of the MapReduce workflow, including the shuffle and sort phase.
-   **Optimizations**: Adds more details on optimizations like combiners, compression, and speculative execution.
-   **New Trends**: Introduces new trends like disk-locality becoming irrelevant and the move towards memory-locality.

## Conclusion

-   **MapReduce** simplifies parallel processing by handling distribution, fault tolerance, and load balancing.
-   **Optimizations** like combiners, compression, and speculative execution improve performance.
-   **New trends** focus on leveraging faster network speeds and memory for better performance.

---

# 3. Hadoop Subprojects Cheatsheet

## Overview

Hadoop ecosystem includes several subprojects that extend its functionality for different use cases, such as data storage, querying, and real-time processing. This cheatsheet covers key subprojects like HBase, Pig, Hive, Impala, Storm, Flume, and Sqoop.

---

## HBase

-   **What is HBase?**

    -   Modeled after Google’s Bigtable.
    -   Key-value row/column store.
    -   Handles billions of rows and millions of columns.
    -   Column-oriented (nulls are free).
    -   Untyped (stores byte arrays).

-   **Data Model**:
    -   **Row Key**: Unique identifier for each row.
    -   **Column Families**: Group of columns (e.g., `animal:type`, `repairs:cost`).
    -   **Timestamp**: Versioning of data.

---

## Pig

-   **What is Pig?**
    -   High-level language for data analysis.
    -   Expresses sequences of MapReduce jobs.
    -   Data model: Nested "bags" of items.
    -   Provides relational operators (JOIN, GROUP BY, etc.).
    -   Easy to plug in Java functions.

---

## Hive

-   **What is Hive?**

    -   Developed by Facebook.
    -   SQL-like query language (HiveQL).
    -   Built on Hadoop (MapReduce + HDFS).
    -   Supports table partitioning, clustering, and complex data types.

-   **Data Model**:
    -   **Tables**: Typed columns (int, float, string, etc.).
    -   **Partitions**: Range-partitioned tables (e.g., by date).
    -   **Buckets**: Hash partitions within ranges.

---

## Impala

-   **What is Impala?**

    -   Massive Parallel Processing (MPP) database engine.
    -   Integrated into Hadoop stack (runs directly on HDFS).
    -   Bypasses MapReduce for faster query execution.
    -   Shares metadata with Hive.

-   **Why Impala?**

    -   Data gravity: Data lives in HDFS, so bring the engine to the data.
    -   Faster than Hive (at least 10x).

-   **Architecture**:

    -   **Query Planner**: Plans queries.
    -   **Query Exec Engine**: Executes queries in parallel.
    -   **Local Direct Reads**: Reads data directly from HDFS.

-   **Data Formats**:
    -   Supports RCFile, Parquet, CSV, AVRO, SequenceFile.

---

## Storm

-   **What is Storm?**

    -   Real-time computation system.
    -   Scalable, fault-tolerant, and robust.
    -   Processes unbounded streams of data.

-   **Key Concepts**:

    -   **Streams**: Unbounded sequence of tuples.
    -   **Spouts**: Source of streams.
    -   **Bolts**: Process input streams and produce new streams.
    -   **Topology**: Network of spouts and bolts.

-   **Stream Grouping**:
    -   **Shuffle grouping**: Random task assignment.
    -   **Fields grouping**: Consistent hashing on tuple fields.
    -   **All grouping**: Send to all tasks.
    -   **Global grouping**: Send to task with lowest ID.

---

## Flume

-   **What is Flume?**

    -   Continuous data ingestion system.
    -   Reliable, scalable, and customizable.
    -   Designed for Big Data ecosystem.

-   **Key Components**:

    -   **Source**: Accepts incoming data.
    -   **Channel**: Stores data in order.
    -   **Sink**: Removes data from channel and sends it to destination.

-   **Flume Agent**:

    -   Simplest unit in Flume.
    -   Connects sources to data stores.
    -   Example: Spooling directory to HDFS.

-   **Transactional Data Exchange**:

    -   Source writes to channel using transactions.
    -   Sink removes data from channel using transactions.
    -   Ensures no data loss.

-   **Types of Sources**:

    -   Spooling Directory, SysLog, Exec, Custom.

-   **Types of Sinks**:
    -   HDFS, HBase, Console Log, Local Directory.

---

## Sqoop

-   **What is Sqoop?**
    -   Tool for importing data from relational databases to Hadoop.
    -   PULL-based (bulk imports).
    -   Supports MySQL, Oracle, SQL Server, PostgreSQL, etc.

---

## Summary

-   **HBase**: Column-oriented storage for large datasets.
-   **Pig**: High-level language for data analysis.
-   **Hive**: SQL-like querying on Hadoop.
-   **Impala**: Fast SQL engine on Hadoop.
-   **Storm**: Real-time stream processing.
-   **Flume**: Data ingestion system.
-   **Sqoop**: Data import from relational databases to Hadoop.

---

# 4. Flume and Sqoop Cheatsheet

## Overview

Flume and Sqoop are essential tools in the Hadoop ecosystem for data ingestion. Flume is designed for continuous data ingestion from multiple sources, while Sqoop is used for importing data from relational databases into Hadoop.

---

## Flume

-   **What is Flume?**

    -   A distributed, reliable, and scalable system for efficiently collecting, aggregating, and moving large amounts of log data.
    -   Designed for streaming data flows (e.g., logs, events).

-   **Key Features**:

    -   **Reliable**: Ensures no data loss with transactional data exchange.
    -   **Scalable**: Handles high volumes of data from multiple sources.
    -   **Customizable**: Supports various sources, channels, and sinks.

-   **Flume Agent**:

    -   Basic unit of Flume.
    -   Consists of **Source**, **Channel**, and **Sink**.
        -   **Source**: Ingests data (e.g., logs, events).
        -   **Channel**: Temporarily stores data.
        -   **Sink**: Writes data to the destination (e.g., HDFS, HBase).

-   **Flume Event**:

    -   Basic unit of data in Flume.
    -   Consists of a **header** (metadata) and a **body** (actual data).

-   **Transactional Data Exchange**:

    -   **Source** writes data to the **Channel** using transactions.
    -   **Sink** reads data from the **Channel** using transactions.
    -   Ensures no data loss during ingestion.

-   **Types of Sources**:

    -   **Spooling Directory**: Reads files from a directory.
    -   **SysLog**: Ingests system logs.
    -   **Exec**: Executes a command to generate data.
    -   **Custom**: User-defined sources.

-   **Types of Channels**:

    -   **Memory**: Fast but not persistent.
    -   **File**: Persistent but slower than memory.

-   **Types of Sinks**:

    -   **HDFS**: Writes data to Hadoop Distributed File System.
    -   **HBase**: Writes data to HBase.
    -   **Logger**: Logs data to the console.

-   **Routing and Replicating**:

    -   **Replicating**: Sends data to multiple channels.
    -   **Multiplexing**: Routes data to specific channels based on headers.

-   **Interceptors**:

    -   Modify or filter events based on content or headers.
    -   Example: Regex Filter Interceptor:
        ```properties
        agent1.sources.source1.interceptors = regexInterceptor
        agent1.sources.source1.interceptors.regexInterceptor.type = regex_filter
        agent1.sources.source1.interceptors.regexInterceptor.regex = .*error.*
        ```

-   **Flume Summary**:
    -   Suitable for large-scale data collection.
    -   Provides weak ordering guarantees.
    -   Transactional exchange ensures no data loss.
    -   Supports contextual routing and popular data sources.

---

## Sqoop

-   **What is Sqoop?**

    -   A tool for transferring bulk data between Hadoop and relational databases.
    -   **PULL-based**: Imports data from RDBMS to Hadoop.
    -   Supports MySQL, Oracle, SQL Server, PostgreSQL, etc.

-   **Key Features**:

    -   **Bulk Imports**: Efficiently imports large datasets.
    -   **Incremental Imports**: Imports only new or modified data.
    -   **Hive Integration**: Directly imports data into Hive tables.

-   **Sqoop Summary**:
    -   Efficiently transfers data between RDBMS and Hadoop.
    -   Supports incremental imports and Hive integration.
    -   Ideal for periodic data dumps from relational databases.

---

## Comparison: Flume vs. Sqoop

| Feature             | Flume                         | Sqoop                |
| ------------------- | ----------------------------- | -------------------- |
| **Data Source**     | Streaming data (logs, events) | Relational databases |
| **Data Type**       | Unstructured/Semi-structured  | Structured           |
| **Use Case**        | Real-time data ingestion      | Batch data transfer  |
| **Integration**     | HDFS, HBase, Kafka, etc.      | HDFS, Hive           |
| **Fault Tolerance** | High (transactional exchange) | Moderate             |

---

## Summary

-   **Flume**: Ideal for real-time, continuous data ingestion from multiple sources.
-   **Sqoop**: Best for batch data transfer between relational databases and Hadoop.
-   Both tools are essential for building robust data pipelines in the Hadoop ecosystem.
