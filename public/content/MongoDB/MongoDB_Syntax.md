# MongoDB Cheatsheet

### **Core CRUD Operations**

#### **Insert Documents**

-   **Insert a Single Document**:
    ```javascript
    db.collection.insertOne({ field1: value1, field2: value2 });
    ```
-   **Insert Multiple Documents**:
    ```javascript
    db.collection.insertMany([
        { field1: value1, field2: value2 },
        { field1: value3, field2: value4 },
    ]);
    ```

#### **Find Queries**

-   **Basic Find**:
    ```javascript
    db.collection.find({ field: value });
    ```
-   **Operators**:

    -   **Comparison Operators**:
        -   `$eq`: Matches equal values.
        -   `$gt`, `$gte`, `$lt`, `$lte`: Greater than, greater than or equal, less than, less than or equal.
        -   `$in`: Matches any value in a given array.
        -   `$ne`: Matches values not equal to a specified value.
        -   `$nin`: Matches values not in a specified array.
    -   **Logical Operators**:
        -   `$and`: Matches documents that satisfy all conditions.
        -   `$or`: Matches documents that satisfy at least one condition.
        -   `$not`: Negates a condition.
        -   `$nor`: Matches documents that fail all conditions.
    -   **Element Operators**:
        -   `$exists`: Matches documents that have a specified field.
        -   `$type`: Matches documents where the field is of a specified type.
    -   **Evaluation Operators**:
        -   `$regex`: Matches documents based on a regular expression.
        -   `$text`: Performs text search on indexed fields.
        -   `$where`: Matches documents based on a JavaScript expression.

-   **Examples**:
    -   Match specific conditions in an array:
        ```javascript
        db.collection.find({
            cars: { $elemMatch: { year: 2021, model: "Citroen" } },
        });
        ```
    -   Combine logical operators:
        ```javascript
        db.collection.find({
            $or: [{ age: { $gt: 18 } }, { status: "active" }],
        });
        ```

#### **Update Documents**

-   **Update a Single Document**:
    ```javascript
    db.collection.updateOne(
        { field: value }, // Filter
        { $set: { field1: newValue } } // Update
    );
    ```
-   **Update Multiple Documents**:
    ```javascript
    db.collection.updateMany(
        { field: value }, // Filter
        { $set: { field1: newValue } } // Update
    );
    ```

#### **Delete Documents**

-   **Delete a Single Document**:
    ```javascript
    db.collection.deleteOne({ field: value });
    ```
-   **Delete Multiple Documents**:
    ```javascript
    db.collection.deleteMany({ field: value });
    ```

---

### **Projections**

-   **Include Specific Fields**:
    ```javascript
    db.collection.find({}, { field1: 1, field2: 1, _id: 0 });
    ```
-   **Exclude Specific Fields**:
    ```javascript
    db.collection.find({}, { field1: 0, field2: 0 });
    ```

---

### **Aggregation Framework**

#### **Pipeline Stages**

-   **`$match`**: Filters documents by conditions.
    ```javascript
    {
        $match: {
            field: value;
        }
    }
    ```
-   **`$project`**: Reshapes documents by including/excluding fields.
    ```javascript
    { $project: { field1: 1, field2: 1 } }
    ```
-   **`$group`**: Aggregates data by grouping documents.
    ```javascript
    { $group: { _id: "$field", count: { $sum: 1 } } }
    ```
-   **`$sort`**: Orders results by specified fields.
    ```javascript
    { $sort: { field1: 1, field2: -1 } } // 1 = ascending, -1 = descending
    ```
-   **`$limit` and `$skip`**: Limits the number of documents and skips a set number of results.
    ```javascript
    { $limit: 10 }, { $skip: 5 }
    ```
-   **`$unwind`**: Deconstructs arrays into multiple documents.
    ```javascript
    {
        $unwind: "$arrayField";
    }
    ```

#### **Examples**

1. **Counting Documents by Field**:
    ```javascript
    db.collection.aggregate([
        { $match: { field: value } },
        { $group: { _id: "$field", count: { $sum: 1 } } },
    ]);
    ```
2. **Flattening Arrays with `$unwind`**:
    ```javascript
    db.collection.aggregate([
        { $unwind: "$arrayField" },
        { $group: { _id: "$arrayField", count: { $sum: 1 } } },
    ]);
    ```
3. **Combining Stages**:
    ```javascript
    db.collection.aggregate([
        { $match: { "cars.model": "Citroen" } },
        { $group: { _id: "$cars.model", avgPrice: { $avg: "$price" } } },
        { $sort: { avgPrice: -1 } },
        { $limit: 5 },
    ]);
    ```

---

### **Indexes**

#### **Create Indexes**

-   **Single Field Index**:
    ```javascript
    db.collection.createIndex({ field: 1 }); // 1 = ascending, -1 = descending
    ```
-   **Compound Index**:
    ```javascript
    db.collection.createIndex({ field1: 1, field2: -1 });
    ```
-   **Sparse Index**:
    ```javascript
    db.collection.createIndex({ field: 1 }, { sparse: true });
    ```

#### **Index Types**

-   **B+ Tree Index**: Default index type in MongoDB.
-   **Text Index**: For text search.
    ```javascript
    db.collection.createIndex({ field: "text" });
    ```

---

### **Querying Nested Documents and Arrays**

#### **Nested Documents**

-   **Querying Subdocuments**:
    ```javascript
    db.collection.find({ "subdocument.field": value });
    ```

#### **Nested Arrays**

-   **Querying Arrays**:
    ```javascript
    db.collection.find({ "arrayField.field": value });
    ```
-   **Using `$elemMatch`**:
    ```javascript
    db.collection.find({
        arrayField: { $elemMatch: { field1: value1, field2: value2 } },
    });
    ```

---

### **MapReduce**

-   **Map Function**:
    ```javascript
    function map() {
        emit(this.field, this.value);
    }
    ```
-   **Reduce Function**:
    ```javascript
    function reduce(key, values) {
        return Array.sum(values);
    }
    ```
-   **Example**:
    ```javascript
    db.collection.mapReduce(
        map, // map function
        reduce, // reduce function
        { out: "results" } // output collection
    );
    ```

---

### **Additional Notes**

#### **Sparse Indexes**

-   Only includes documents where the indexed field exists, ignoring others.

#### **Compound Index Order**

-   The order of fields in a compound index matters for query performance.
    ```javascript
    db.collection.createIndex({ field1: 1, field2: -1 });
    ```

#### **`$not` Usage**

-   Negates conditions:
    ```javascript
    db.collection.find({ field: { $not: { $gte: 100 } } });
    ```

---
