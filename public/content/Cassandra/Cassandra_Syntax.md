# Cassandra Cheatsheet

## 1. Introduction to Cassandra

-   **Apache Cassandra**: A highly scalable, distributed NoSQL database designed for high availability and performance.
-   **Features**:
    -   Highly and linearly scalable.
    -   No single point of failure.
    -   Fast writes and quick response times.
    -   Flexible data storage (structured, unstructured, semi-structured).
    -   BASE properties (Basically Available, Soft-state, Eventual consistency).

---

## 2. Cassandra Query Language (CQL)

### 2.1 Keyspace Operations

#### CREATE KEYSPACE

-   **Syntax**:
    ```sql
    CREATE KEYSPACE <keyspace_name>
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': <replication_factor>};
    ```
-   **Example**:
    ```sql
    CREATE KEYSPACE population
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};
    ```

#### USE KEYSPACE

-   **Syntax**:
    ```sql
    USE <keyspace_name>;
    ```
-   **Example**:
    ```sql
    USE population;
    ```

#### DESCRIBE KEYSPACE

-   **Syntax**:
    ```sql
    DESCRIBE keyspaces;
    DESCRIBE <keyspace_name>;
    ```
-   **Example**:
    ```sql
    DESCRIBE population;
    ```

#### ALTER KEYSPACE

-   **Syntax**:
    ```sql
    ALTER KEYSPACE <keyspace_name> WITH <properties>;
    ```
-   **Example**:
    ```sql
    ALTER KEYSPACE population WITH replication = {'class': 'NetworkTopologyStrategy', 'DC1': 3};
    ```

#### DROP KEYSPACE

-   **Syntax**:
    ```sql
    DROP KEYSPACE <keyspace_name>;
    ```
-   **Example**:
    ```sql
    DROP KEYSPACE population;
    ```

---

### 2.2 Table Operations

#### CREATE TABLE

-   **Syntax**:
    ```sql
    CREATE TABLE <table_name> (
        <column_name> <column_type>,
        ...
        PRIMARY KEY (<partition_key>, <clustering_key>)
    ) WITH CLUSTERING ORDER BY (<clustering_key> ASC|DESC);
    ```
-   **Example**:
    ```sql
    CREATE TABLE person (
        personal_id text,
        name text,
        age int,
        birth_date text,
        gender text,
        PRIMARY KEY (personal_id, age)
    ) WITH CLUSTERING ORDER BY (age ASC);
    ```

#### DESCRIBE TABLE

-   **Syntax**:
    ```sql
    DESCRIBE <table_name>;
    ```
-   **Example**:
    ```sql
    DESCRIBE person;
    ```

#### ALTER TABLE

-   **Syntax**:
    ```sql
    ALTER TABLE <table_name> ADD <column_name> <column_type>;
    ALTER TABLE <table_name> DROP <column_name>;
    ```
-   **Example**:
    ```sql
    ALTER TABLE person ADD address text;
    ALTER TABLE person DROP address;
    ```

#### DROP TABLE

-   **Syntax**:
    ```sql
    DROP TABLE <table_name>;
    ```
-   **Example**:
    ```sql
    DROP TABLE person;
    ```

#### TRUNCATE TABLE

-   **Syntax**:
    ```sql
    TRUNCATE TABLE <table_name>;
    ```
-   **Example**:
    ```sql
    TRUNCATE TABLE person;
    ```

---

### 2.3 Index Operations

#### CREATE INDEX

-   **Syntax**:
    ```sql
    CREATE INDEX <index_name> ON <table_name> (<column_name>);
    ```
-   **Example**:
    ```sql
    CREATE INDEX person_name ON person (name);
    ```

#### DROP INDEX

-   **Syntax**:
    ```sql
    DROP INDEX <index_name>;
    ```
-   **Example**:
    ```sql
    DROP INDEX person_name;
    ```

---

### 2.4 Data Manipulation

#### INSERT

-   **Syntax**:
    ```sql
    INSERT INTO <table_name> (<column1>, <column2>, ...)
    VALUES (<value1>, <value2>, ...);
    ```
-   **Example**:
    ```sql
    INSERT INTO person (personal_id, name, age, birth_date, gender)
    VALUES ('FRNTR295E12F675T', 'Francesco Terzani', 26, '12-05-1995', 'Male');
    ```

#### SELECT

-   **Syntax**:
    ```sql
    SELECT <columns> FROM <table_name> WHERE <condition>;
    ```
-   **Example**:
    ```sql
    SELECT * FROM person WHERE personal_id = 'FRNTR295E12F675T';
    ```

#### UPDATE

-   **Syntax**:
    ```sql
    UPDATE <table_name> SET <column_name> = <new_value> WHERE <condition>;
    ```
-   **Example**:
    ```sql
    UPDATE person SET address = 'Via Milani 13' WHERE personal_id = 'FRNTR295E12F675T';
    ```

#### DELETE

-   **Syntax**:
    ```sql
    DELETE FROM <table_name> WHERE <condition>;
    ```
-   **Example**:
    ```sql
    DELETE FROM person WHERE personal_id = 'FRNTR295E12F675T';
    ```

---

### 2.5 Batch Operations

#### BATCH

-   **Syntax**:
    ```sql
    BEGIN BATCH
        <insert_statement>;
        <update_statement>;
        <delete_statement>;
    APPLY BATCH;
    ```
-   **Example**:
    ```sql
    BEGIN BATCH
        INSERT INTO person (personal_id, name) VALUES ('123', 'John Doe');
        UPDATE person SET age = 30 WHERE personal_id = '123';
        DELETE FROM person WHERE personal_id = '456';
    APPLY BATCH;
    ```

---

### 2.6 Utility Commands

#### CAPTURE

-   **Syntax**:
    ```sql
    CAPTURE '<file_path>';
    CAPTURE off;
    ```
-   **Example**:
    ```sql
    CAPTURE 'D:/output.txt';
    SELECT * FROM person;
    CAPTURE off;
    ```

#### EXPAND

-   **Syntax**:
    ```sql
    EXPAND on;
    EXPAND off;
    ```
-   **Example**:
    ```sql
    EXPAND on;
    SELECT * FROM person;
    EXPAND off;
    ```

#### SOURCE

-   **Syntax**:
    ```sql
    SOURCE '<file_path>';
    ```
-   **Example**:
    ```sql
    SOURCE 'D:/queries/query_1.txt';
    ```

---

### 2.7 Data Types

#### Collections

-   **Syntax**:
    ```sql
    CREATE TABLE <table_name> (
        <column_name> list<text>,
        ...
    );
    ```
-   **Example**:
    ```sql
    CREATE TABLE test (
        email list<text>,
        ...
    );
    ```

#### User-Defined Types

-   **Syntax**:
    ```sql
    CREATE TYPE <type_name> (
        <column_name> <column_type>,
        ...
    );
    ```
-   **Example**:
    ```sql
    CREATE TYPE feature (
        name text,
        description text
    );
    ```

---

## 3. Example Exercise

### Create a Keyspace and Table

```sql
CREATE KEYSPACE car_dealer
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

USE car_dealer;

CREATE TABLE car (
    car_id uuid,
    brand text,
    max_speed int,
    price float,
    consumption_lt_per_km float,
    PRIMARY KEY (car_id, max_speed)
) WITH CLUSTERING ORDER BY (max_speed ASC);
```

### Insert Data

```sql
INSERT INTO car (car_id, brand, max_speed, price, consumption_lt_per_km)
VALUES (uuid(), 'Ferrari', 320, 200000.00, 30.00);
```

### Query Data

```sql
SELECT * FROM car WHERE price > 100000 ALLOW FILTERING;
```

---
