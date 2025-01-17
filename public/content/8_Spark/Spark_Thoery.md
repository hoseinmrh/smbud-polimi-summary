# Spark and Big Data Processing - Summary

## Introduction to Big Data

-   **Big Data Uses**:

    -   Reports: Track business processes, transactions.
    -   Diagnosis: Identify user engagement drops, system slowdowns.
    -   Security: Detect spam, worms, viruses, DDoS attacks.
    -   Decisions: Personalized medical treatment, product features, ad targeting.

-   **Data Processing Goals**:
    -   Low latency queries on historical data.
    -   Low latency queries on live data (streaming).
    -   Sophisticated data processing: anomaly detection, trend analysis.

## The Need for Unification

-   **Challenges**:

    -   Maintaining separate stacks for batch, streaming, and interactive queries.
    -   Expensive and complex.
    -   Hard to compute consistent metrics across stacks.
    -   Slow data sharing across stacks.

-   **Unified Approach**:
    -   Real-time decisions: Detect DDoS, fraud, etc.
    -   Complex algorithms: Machine learning, graph processing.

## Data Processing Stack

-   **Layers**:
    -   Data Processing Layer.
    -   Resource Management Layer.
    -   Storage Layer.

## Spark Overview

-   **What is Spark?**:

    -   Open-source project by Apache.
    -   First released in February 2013.
    -   Created at AMPLab, UC Berkeley.

-   **Berkeley Data Analytics Stack**:
    -   Components: Spark, BlinkDB, ML Pipelines, Streaming, SparkSQL, GraphX, MLlib, Mesos, Tachyon, HDFS, S3.

## HDFS (Hadoop Distributed File System)

-   **Overview**:

    -   Stores data on the cluster.
    -   Files split into blocks and distributed across nodes.
    -   Blocks are replicated multiple times.

-   **Basic Concepts**:

    -   Based on Google's GFS.
    -   Optimized for large files (100MB+).
    -   Write-once, read-many access model.

-   **File Storage**:

    -   Files split into blocks, stored across machines.
    -   NameNode tracks blocks and their locations.

-   **Data Replication**:

    -   Default replication factor: 3.
    -   Replicas placed on different nodes and racks.

-   **HDFS Architecture**:

    -   NameNode: Manages file system namespace, block replication.
    -   DataNode: Stores data, serves data to clients, sends block reports.

-   **HDFS Security**:
    -   Authentication: Simple (OS username) or Kerberos.
    -   File permissions: POSIX-like (read, write, execute).

## Spark Components

-   **Spark Core**:

    -   Resilient Distributed Datasets (RDDs): Immutable, fault-tolerant, parallel operations.
    -   Transformations and Actions: Lazy evaluation, triggers execution.

-   **Spark Streaming**:

    -   Large-scale streaming computation.
    -   Fault-tolerant, handles stragglers, ensures exactly-once semantics.

-   **SparkSQL**:

    -   SQL queries on structured data.
    -   Up to 100x faster than Hive for in-memory data.

-   **MLlib**:
    -   Machine learning library.
    -   Supports pipelines for data processing and model training.

## Spark RDDs

-   **Features**:

    -   Distributed collection of data.
    -   Fault-tolerant.
    -   Parallel operations.
    -   Supports multiple data sources.

-   **Operations**:

    -   Transformations: map, filter, join (lazy evaluation).
    -   Actions: count, collect, save (trigger execution).

-   **Narrow vs. Wide Transformations**:
    -   Narrow: Data in single partition (e.g., filter).
    -   Wide: Data in multiple partitions (e.g., groupBy).

## DataFrames and Datasets

-   **DataFrame**:

    -   Immutable data with named columns.
    -   User-friendly API, optimized performance.
    -   Supports SQL queries and relational operations.

-   **Dataset**:
    -   Typed API for structured data.
    -   Combines benefits of RDDs and DataFrames.

## Spark SQL

-   **Overview**:

    -   SQL queries on structured data.
    -   Integrates with Hive, supports UDFs.
    -   Catalyst optimizer for query optimization.

-   **Performance**:
    -   Faster than traditional MapReduce.
    -   Optimized for in-memory processing.

## Spark MLlib

-   **Pipelines**:
    -   Tokenizer, HashingTF, Logistic Regression.
    -   Fit and transform data for machine learning.

## Parquet and Avro

-   **Parquet**:

    -   Columnar storage format.
    -   Optimized for high compression and scan efficiency.
    -   Supports nested data structures.

-   **Avro**:
    -   Language-neutral data serialization.
    -   Supports schema evolution, compression.

## Performance and Optimization

-   **Catalyst Optimizer**:

    -   Rule-based optimization: predicate pushdown, column pruning.
    -   Code generation for efficient execution.

-   **Performance Comparisons**:
    -   Spark outperforms Hadoop in iterative algorithms (e.g., K-Means, Logistic Regression).
    -   Faster data processing with in-memory computation.

## Conclusion

-   **Spark**:

    -   Unified platform for batch, streaming, and interactive queries.
    -   Easy to develop sophisticated algorithms.
    -   High performance, fault-tolerant, and scalable.

-   **HDFS**:
    -   Reliable, distributed file system for large-scale data storage.
    -   Optimized for batch processing and high aggregate bandwidth.
