# Redis Cheatsheet

This cheatsheet covers the essential Redis commands and concepts, focusing on **data types**, **basic operations**, **complex data structures**, and **atomic operations**. It is designed to be a quick reference for Redis syntax and usage.

---

## **Redis Basics**

### **Key-Value Operations**

-   **Set a Key-Value Pair**:
    ```bash
    SET key_name value
    ```
-   **Get a Value by Key**:
    ```bash
    GET key_name
    ```
-   **Set Multiple Key-Value Pairs**:
    ```bash
    MSET key1 value1 key2 value2
    ```
-   **Get Multiple Values by Keys**:
    ```bash
    MGET key1 key2
    ```
-   **Delete a Key**:
    ```bash
    DEL key_name
    ```
-   **Check if a Key Exists**:
    ```bash
    EXISTS key_name
    ```
-   **Get the Type of a Key**:
    ```bash
    TYPE key_name
    ```
-   **Rename a Key**:
    ```bash
    RENAME old_key new_key
    ```

### **Expiration and TTL**

-   **Set Key Expiration (in seconds)**:
    ```bash
    EXPIRE key_name time_to_live
    ```
-   **Get Remaining Time to Live (TTL)**:
    ```bash
    TTL key_name
    ```
    -   Returns:
        -   `-1`: Key will never expire.
        -   `-2`: Key has already expired.
        -   `remaining_time`: Time left in seconds.
-   **Make a Temporary Key Permanent**:
    ```bash
    PERSIST key_name
    ```

---

## **Atomic Operations**

-   **Increment a Value**:
    ```bash
    INCR key_name
    ```
-   **Increment by a Specific Amount**:
    ```bash
    INCRBY key_name value
    ```
-   **Decrement a Value**:
    ```bash
    DECR key_name
    ```
-   **Decrement by a Specific Amount**:
    ```bash
    DECRBY key_name value
    ```

---

## **Complex Data Structures**

### **Lists**

-   **Push to the End of a List**:
    ```bash
    RPUSH key_name value
    ```
-   **Push to the Beginning of a List**:
    ```bash
    LPUSH key_name value
    ```
-   **Pop from the End of a List**:
    ```bash
    RPOP key_name
    ```
-   **Pop from the Beginning of a List**:
    ```bash
    LPOP key_name
    ```
-   **Get a Range of Elements**:
    ```bash
    LRANGE key_name start_index end_index
    ```
-   **Get the Length of a List**:
    ```bash
    LLEN key_name
    ```

### **Sets**

-   **Add Members to a Set**:
    ```bash
    SADD key_name member1 member2
    ```
-   **Remove Members from a Set**:
    ```bash
    SREM key_name member1 member2
    ```
-   **Check if a Member Exists in a Set**:
    ```bash
    SISMEMBER key_name member
    ```
-   **Get All Members of a Set**:
    ```bash
    SMEMBERS key_name
    ```
-   **Union of Multiple Sets**:
    ```bash
    SUNION key1 key2
    ```
-   **Difference Between Sets**:
    ```bash
    SDIFF key1 key2
    ```

### **Sorted Sets**

-   **Add Members with Scores**:
    ```bash
    ZADD key_name score1 member1 score2 member2
    ```
-   **Get Members by Score Range**:
    ```bash
    ZRANGEBYSCORE key_name min_score max_score
    ```
-   **Increment a Member's Score**:
    ```bash
    ZINCRBY key_name increment member
    ```
-   **Remove Members by Score Range**:
    ```bash
    ZREMRANGEBYSCORE key_name min_score max_score
    ```

### **Hashes**

-   **Set a Field in a Hash**:
    ```bash
    HSET key_name field1 value1 field2 value2
    ```
-   **Get a Field from a Hash**:
    ```bash
    HGET key_name field
    ```
-   **Get All Fields and Values from a Hash**:
    ```bash
    HGETALL key_name
    ```
-   **Increment a Numeric Field in a Hash**:
    ```bash
    HINCRBY key_name field increment
    ```

---

## **Advanced Commands**

### **Blocking Operations**

-   **Blocking Pop from a List**:
    ```bash
    BLPOP key_name timeout
    BRPOP key_name timeout
    ```

### **Geospatial Indexes**

-   **Add Geospatial Data**:
    ```bash
    GEOADD key_name longitude latitude member
    ```
-   **Search by Radius**:
    ```bash
    GEORADIUS key_name longitude latitude radius unit
    ```

### **HyperLogLog**

-   **Add Items to HyperLogLog**:
    ```bash
    PFADD key_name item1 item2
    ```
-   **Get Cardinality of HyperLogLog**:
    ```bash
    PFCOUNT key_name
    ```

---

## **Redis Data Types**

| **Data Type**        | **Description**                                                          | **Commands**                                               |
| -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **String**           | Binary-safe strings, integers, floats, or bitmaps.                       | `SET`, `GET`, `INCR`, `DECR`, `MSET`, `MGET`               |
| **Hash**             | Unordered hash table of keys to string values.                           | `HSET`, `HGET`, `HGETALL`, `HINCRBY`                       |
| **List**             | Doubly linked list of strings.                                           | `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LRANGE`, `LLEN`         |
| **Set**              | Unordered collection of unique strings.                                  | `SADD`, `SREM`, `SISMEMBER`, `SMEMBERS`, `SUNION`, `SDIFF` |
| **Sorted Set**       | Ordered mapping of string members to floating-point scores.              | `ZADD`, `ZRANGEBYSCORE`, `ZINCRBY`, `ZREMRANGEBYSCORE`     |
| **Geospatial Index** | Sorted set implementation using geospatial information as the score.     | `GEOADD`, `GEORADIUS`                                      |
| **HyperLogLog**      | Probabilistic data structure to count unique items using 12KB of memory. | `PFADD`, `PFCOUNT`                                         |

---

## **Redis Commands Summary**

### **Basic Commands**

-   `SET key value`: Set a key-value pair.
-   `GET key`: Get the value of a key.
-   `DEL key`: Delete a key.
-   `EXISTS key`: Check if a key exists.
-   `EXPIRE key seconds`: Set a key's expiration time.
-   `TTL key`: Get the remaining time to live for a key.

### **Atomic Operations**

-   `INCR key`: Increment a key's value by 1.
-   `INCRBY key value`: Increment a key's value by a specified amount.
-   `DECR key`: Decrement a key's value by 1.
-   `DECRBY key value`: Decrement a key's value by a specified amount.

### **Complex Data Structures**

-   **Lists**: `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LRANGE`, `LLEN`.
-   **Sets**: `SADD`, `SREM`, `SISMEMBER`, `SMEMBERS`, `SUNION`, `SDIFF`.
-   **Sorted Sets**: `ZADD`, `ZRANGEBYSCORE`, `ZINCRBY`, `ZREMRANGEBYSCORE`.
-   **Hashes**: `HSET`, `HGET`, `HGETALL`, `HINCRBY`.
