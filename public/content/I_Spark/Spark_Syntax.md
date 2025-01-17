# PySpark Cheatsheet

## Setting Up Spark Session

To start using PySpark, you need to create a Spark session, which is the entry point to using Spark.

```python
from pyspark.sql import SparkSession

# Create a Spark session
spark = SparkSession.builder \
      .master("local") \
      .appName("spark_tutorial") \
      .getOrCreate()
```

---

## Resilient Distributed Dataset (RDD)

RDDs are the fundamental data structure in Spark. They are:

-   Fault-tolerant
-   Resilient
-   Immutable
-   Partitioned

### Creating an RDD

```python
# Upload data from a list
data = [("Margherita", 5.95, ["Tomato Sauce", "Mozzarella Cheese", "Basil"]),
        ("Calzone", 7.95, ["Tomato Sauce", "Mozzarella Cheese", "Prosciutto Cotto"])]

# Create an RDD
rdd = spark.sparkContext.parallelize(data)
```

### Uploading Data from a File

```python
# Upload list from a file
rdd_2 = spark.sparkContext.textFile("menu.txt")
```

---

## DataFrame Creation

DataFrames are a higher-level abstraction built on top of RDDs, providing a more user-friendly API for data manipulation.

### Creating a DataFrame from a List

```python
df_data = [("Margherita", 5.95, ["Tomato Sauce", "Mozzarella Cheese", "Basil"]),
           ("Calzone", 7.95, ["Tomato Sauce", "Mozzarella Cheese", "Prosciutto Cotto"]),
           ("Diavola", 5.95, ["Tomato Sauce", "Mozzarella Cheese", "Spicy Salame"])]

columns = ["Pizza Name", "Price", "Ingredients"]
df = spark.createDataFrame(data=df_data, schema=columns)
```

### Creating a DataFrame with a Custom Schema

```python
from pyspark.sql.types import StructType, StructField, StringType, FloatType, ArrayType

schema = StructType([
    StructField("Pizza Name", StringType(), True),
    StructField("Price", FloatType(), True),
    StructField("Ingredients", ArrayType(StringType()), True)
])

df = spark.createDataFrame(data=df_data, schema=schema)
```

### Showing DataFrame Content

```python
# Show the first 20 elements of a DataFrame
df.show(truncate=False)
```

---

## Data Filtering

Filtering operations allow you to select subsets of data based on conditions.

### Basic Filtering

```python
# Filtering using equal condition
df.filter(df.Price == "7.95").show(truncate=False)

# Filtering using not equal condition
df.filter(df.Price != "7.95").show(truncate=False)

# Filtering using SQL Expression
df.filter("Price == '7.95'").show(truncate=False)
```

### Filtering with Multiple Conditions

```python
from pyspark.sql.functions import col

# Filtering with multiple conditions
df.filter((df.Price == "7.95") | (col("Pizza Name") == "Margherita")).show(truncate=False)
```

### Filtering with `isin`

```python
# Filtering with a list of elements
favourite_pizzas = ["Speck & Brie", "Tonno & Cipolle"]
df.filter(col("Pizza Name").isin(favourite_pizzas)).show(truncate=False)
```

### Filtering Based on Column Content

```python
# Filtering based on the initial letter(s)
df.filter(col("Pizza Name").startswith("To")).show(truncate=False)

# Filtering based on the ending letter(s)
df.filter(col("Pizza Name").endswith("one")).show(truncate=False)

# Filtering based on whether a word is contained in the word
df.filter(col("Pizza Name").contains("&")).show(truncate=False)
```

### Filtering on Array Columns

```python
from pyspark.sql.functions import array_contains

# Filtering on a single value
df.filter(array_contains(df.Ingredients, "Tomato Sauce")).show(truncate=False)

# Filtering on multiple values
df.filter(array_contains(df.Ingredients, "Tomato Sauce") & array_contains(df.Ingredients, "Basil")).show(truncate=False)
```

---

## Data Grouping

Grouping operations allow you to aggregate data based on certain columns.

### Basic Grouping

```python
# Count
df.groupBy("Price").count().show(truncate=False)

# Minimum
df.groupBy().min("Price").show(truncate=False)

# Average
df.groupBy().avg("Price").show(truncate=False)
```

### Grouping Multiple Columns

```python
# Explode the array column to perform more interesting operations
from pyspark.sql.functions import explode, col

exploded_df = df.select(col("Pizza Name"), df.Price, explode(df.Ingredients))
exploded_df = exploded_df.withColumnRenamed("col", "Ingredient")

# Counting
exploded_df.groupBy("Ingredient", "Price").count().show(truncate=False)
```

### Multiple Aggregations

```python
from pyspark.sql.functions import sum, avg, count, max

exploded_df.groupBy("Pizza Name").agg(
    sum("Price").alias("Sum Price"),
    avg("Price").alias("Average Price"),
    count("Ingredient").alias("Number of Ingredients"),
    max("Price").alias("Price")).show(truncate=False)
```

---

## Data Joining

Joining operations allow you to combine data from multiple DataFrames based on a common key.

### Inner Join

```python
# Inner join - returns the tuples that matched in both tables
df.join(ingredient_df, df.Ingredients_ID == ingredient_df.Ingredients_ID, "inner").show(truncate=False)
```

### Outer Join

```python
# Outer join - returns all the tuples from both tables, with null values for non-matching rows
df.join(ingredient_df, df.Ingredients_ID == ingredient_df.Ingredients_ID, "outer").show(truncate=False)
```

### Left Join

```python
# Left join - returns all the tuples from the left table, with null values for non-matching rows in the right table
df.join(ingredient_df, df.Ingredients_ID == ingredient_df.Ingredients_ID, "left").show(truncate=False)
```

### Right Join

```python
# Right join - returns all the tuples from the right table, with null values for non-matching rows in the left table
df.join(ingredient_df, df.Ingredients_ID == ingredient_df.Ingredients_ID, "right").show(truncate=False)
```

### Left Semi Join

```python
# Left Semi join - returns only the rows from the left table that have a match in the right table
df.join(ingredient_df, df.Ingredients_ID == ingredient_df.Ingredients_ID, "leftsemi").show(truncate=False)
```

### Left Anti Join

```python
# Left Anti join - returns only the rows from the left table that do not have a match in the right table
df.join(ingredient_df, df.Ingredients_ID == ingredient_df.Ingredients_ID, "leftanti").show(truncate=False)
```

### Self Join

```python
# Self join - joins a DataFrame with itself
df.alias("df_1").join(df.alias("df_2"), col("df_1.Ingredients_ID") == col("df_2.Ingredients_ID"), "inner").show(truncate=False)
```

---

## Aggregate Functions

Aggregate functions allow you to perform calculations on groups of data.

### Count Distinct

```python
from pyspark.sql.functions import countDistinct

# Count distinct values in a column
df.select(countDistinct("Ingredient")).show(truncate=False)
```

### Collect List

```python
from pyspark.sql.functions import collect_list

# Collect all values from a column (with duplicates)
df.select(collect_list("Ingredient")).show(truncate=False)
```

### Collect Set

```python
from pyspark.sql.functions import collect_set

# Collect all values from a column (without duplicates)
df.select(collect_set("Ingredient")).show(truncate=False)
```

### First and Last

```python
from pyspark.sql.functions import first, last

# Select the first non-null element of the column
df.select(first("Ingredients")).show(truncate=False)

# Select the last non-null element of the column
df.select(last("Ingredients")).show(truncate=False)
```

---

This cheatsheet covers the most common PySpark operations. For more advanced use cases, refer to the official [PySpark documentation](https://spark.apache.org/docs/latest/api/python/).
