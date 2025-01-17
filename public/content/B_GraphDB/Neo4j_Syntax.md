# Neo4j and Cypher Cheat Sheet

In this file we will take a look at how to code and query for Neo4j using Cypher.

Sections:

-   [Cypher Syntax](#cypher-syntax)
-   [Appendix](#appendix)

## Cypher Syntax

### **1. Create Nodes**

```cypher
CREATE (n:Label {property1: value1, property2: value2})
```

Example:

```cypher
CREATE (p:Person {name: "Alice", age: 30})
```

### **2. Create Relationships**

```cypher
CREATE (node1)-[:RELATIONSHIP_TYPE]->(node2)
```

Example:

```cypher
CREATE (p)-[:FRIENDS_WITH]->(q)
```

### **3. Match (Retrieve Nodes and Relationships)**

```cypher
MATCH (n:Label {property: value})
RETURN n
```

Example:

```cypher
MATCH (p:Person {name: "Alice"})
RETURN p
```

### **4. Merge (Ensure Uniqueness)**

-   `MERGE` finds or creates the specified pattern.

```cypher
MERGE (n:Label {property: value})
```

Example:

```cypher
MERGE (p:Person {name: "Alice"})
MERGE (p)-[:FRIENDS_WITH]->(q:Person {name: "Bob"})
```

### **5. Different Types of Patterns**

-   **Unidirectional Relationship**: `(a)-[:REL_TYPE]->(b)`
-   **Bidirectional Relationship**: `(a)-[:REL_TYPE]-(b)`
-   **Undirected Relationship**: `(a)--(b)`
-   **Variable Length Path**: `(a)-[:REL_TYPE*1..3]->(b)` (1 to 3 hops)
-   **Path Definition**: `p = (a)-[:REL_TYPE*]->(b)` (assigns a path to variable `p`)

### **6. Using Periodic Commit**

-   Useful for batch processing large data imports.

```cypher
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///path/to/file.csv' AS row
```

### **7. Load CSV with Headers**

```cypher
LOAD CSV WITH HEADERS FROM 'file:///path/to/file.csv' AS row
MERGE (p:Person {name: row.name})
```

### **8. ON CREATE SET and ON MATCH SET**

-   Use with `MERGE` to set properties conditionally.

```cypher
MERGE (p:Person {name: "Alice"})
ON CREATE SET p.createdAt = timestamp()
ON MATCH SET p.lastSeen = timestamp()
```

### **9. Create Indexes**

-   Helps speed up lookups on a specific property.

```cypher
CREATE INDEX FOR (n:Label) ON (n.property)
```

Example:

```cypher
CREATE INDEX FOR (p:Person) ON (p.name)
```

### **10. Create Constraints**

-   Ensures property uniqueness.

```cypher
CREATE CONSTRAINT FOR (n:Label) REQUIRE n.property IS UNIQUE
```

Example:

```cypher
CREATE CONSTRAINT FOR (p:Person) REQUIRE p.name IS UNIQUE
```

### **11. WHERE Clause**

-   Filters nodes or relationships.

```cypher
MATCH (p:Person)
WHERE p.age > 25
RETURN p
```

### **12. Assert (WITH WHERE)**

-   Validate conditions in `WITH` clauses (especially useful for pipelines).

```cypher
MATCH (p:Person)
WITH p, p.age AS age
WHERE age > 18
RETURN p
```

### **13. WITH Clause**

-   Passes variables along, allows aggregation, and can be used with `WHERE`.

```cypher
MATCH (p:Person)
WITH p.name AS name, COUNT(*) AS count
RETURN name, count
```

### **14. Aggregation Functions**

-   **COUNT()**: Counts nodes or relationships.
-   **SUM()**: Sums numeric properties.
-   **AVG()**: Calculates the average.
-   **MIN()**/**MAX()**: Finds minimum/maximum values.
-   **COLLECT()**: Collects results into a list.

Example:

```cypher
MATCH (p:Person)
RETURN COUNT(p), AVG(p.age), SUM(p.age)
```

### **15. SKIP and LIMIT**

-   Pagination for query results.

```cypher
MATCH (p:Person)
RETURN p.name
SKIP 5 LIMIT 10
```

### **16. Paths**

-   Define paths and work with them.

```cypher
MATCH p = (a)-[:REL_TYPE*1..3]->(b)
RETURN p
```

-   **Return Nodes in a Path**:

```cypher
MATCH p = (a)-[:FRIENDS_WITH*1..3]->(b)
RETURN nodes(p)
```

-   **Return Relationships in a Path**:

```cypher
MATCH p = (a)-[:FRIENDS_WITH*1..3]->(b)
RETURN relationships(p)
```

---

### **Full Example: Importing Data, Creating Nodes, Relationships, and Constraints**

```cypher
// Import data
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM 'file:///people.csv' AS row
MERGE (p:Person {name: row.name})
ON CREATE SET p.age = toInteger(row.age), p.createdAt = timestamp()

// Create Relationships
MATCH (p:Person {name: row.name}), (f:Person {name: row.friend_name})
MERGE (p)-[:FRIENDS_WITH]->(f)

// Create Index
CREATE INDEX FOR (p:Person) ON (p.name)

// Create Unique Constraint
CREATE CONSTRAINT FOR (p:Person) REQUIRE p.name IS UNIQUE

// Query with Aggregation, Skip, and Limit
MATCH (p:Person)-[:FRIENDS_WITH]->(f:Person)
WITH p, COUNT(f) AS friendsCount
WHERE friendsCount > 1
RETURN p.name, friendsCount
ORDER BY friendsCount DESC
SKIP 5 LIMIT 10
```

## Appendix

### **1. Difference between Merge and Match**

In Cypher, **`MATCH`** and **`MERGE`** are both used to find patterns (nodes or relationships) in the graph, but they serve different purposes and behave differently when no match is found.

Here's a breakdown of the differences:

---

### 1.1 **Purpose**

-   **`MATCH`**: Used to **find** existing nodes or relationships in the graph. If the specified pattern is not found, `MATCH` returns nothing.
-   **`MERGE`**: Used to **find or create** nodes or relationships. If the specified pattern is not found, `MERGE` creates it.

---

### 1.2 **Behavior When No Match is Found**

-   **`MATCH`**: If the pattern doesn’t exist, no changes are made to the database, and the query simply returns no results.

    ```cypher
    MATCH (p:Person {name: "Alice"})
    RETURN p
    ```

    -   If a `Person` node with the name "Alice" exists, `MATCH` will return it.
    -   If no such node exists, the query returns `null` or no results.

-   **`MERGE`**: If the pattern doesn’t exist, `MERGE` creates a new node or relationship that matches the pattern.

    ```cypher
    MERGE (p:Person {name: "Alice"})
    RETURN p
    ```

    -   If a `Person` node with the name "Alice" exists, `MERGE` will return it.
    -   If no such node exists, `MERGE` will create a new `Person` node with `name: "Alice"` and return it.

---

### 1.3 **Use Cases**

-   **`MATCH`**: Use `MATCH` when you only want to find existing data and not modify or create any new data.

    -   Ideal for read-only queries or searches.
    -   For example, finding all movies released after a certain year:

        ```cypher
        MATCH (m:Movie)
        WHERE m.year > 2000
        RETURN m.title, m.year
        ```

-   **`MERGE`**: Use `MERGE` when you want to ensure that a specific pattern exists. It’s useful for "upsert" operations (update or insert) where you want to create the pattern if it doesn’t exist.

    -   Commonly used to prevent duplicate nodes or relationships.
    -   For example, ensuring a relationship exists between two nodes:

        ```cypher
        MATCH (p1:Person {name: "Alice"}), (p2:Person {name: "Bob"})
        MERGE (p1)-[:FRIENDS_WITH]->(p2)
        ```

        -   If Alice and Bob are not friends yet, `MERGE` will create the `FRIENDS_WITH` relationship.
        -   If they are already friends, `MERGE` will do nothing.

---

### 1.4 **Additional Control with `ON CREATE SET` and `ON MATCH SET`**

-   **`MERGE`** can be followed by `ON CREATE SET` and `ON MATCH SET` clauses to set properties conditionally based on whether the pattern was created or matched.

    ```cypher
    MERGE (p:Person {name: "Alice"})
    ON CREATE SET p.createdAt = timestamp()
    ON MATCH SET p.lastAccessed = timestamp()
    ```

    -   If `Alice` doesn’t exist, this will create a new node with a `createdAt` timestamp.
    -   If `Alice` already exists, it will update her `lastAccessed` timestamp.

-   **`MATCH`** does not support `ON CREATE SET` or `ON MATCH SET` because it only matches existing data and does not create anything.

---

### 1.5 **Example Scenarios**

-   **Using `MATCH`**:

    -   To find all clients who own a specific pet:

        ```cypher
        MATCH (c:Client)-[:HAS_PET]->(:Cat {name: "Whiskers"})
        RETURN c.name
        ```

-   **Using `MERGE`**:

    -   To add a pet to a client only if that relationship doesn’t already exist:

        ```cypher
        MATCH (c:Client {name: "Alice"}), (p:Parrot {name: "Coco"})
        MERGE (c)-[:HAS_PET]->(p)
        ```

---

### 1.6 **Performance Considerations**

-   **`MATCH`** is faster for read-only operations because it only searches for existing data.
-   **`MERGE`** can be slower, especially if it involves creating nodes or relationships, as it needs to check if the pattern exists and potentially create new data.

---

### Summary

| Feature         | `MATCH`                           | `MERGE`                                          |
| --------------- | --------------------------------- | ------------------------------------------------ |
| Purpose         | Find existing nodes/relationships | Find or create nodes/relationships               |
| No Match Found  | Returns nothing                   | Creates the specified pattern                    |
| Use Case        | Read-only queries, searching data | Upsert operations, ensuring existence            |
| Conditional Set | Not supported                     | Supports `ON CREATE SET` and `ON MATCH SET`      |
| Performance     | Faster for reads                  | Can be slower due to existence checks and writes |

In short, **use `MATCH` for finding existing data only** and **`MERGE` when you want to make sure a pattern exists**, creating it if it doesn’t.
