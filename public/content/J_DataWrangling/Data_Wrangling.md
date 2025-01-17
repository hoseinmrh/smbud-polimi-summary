# Data Wrangling Summary

## 1. **Introduction to Data Quality**

-   **Conventional Definition of Data Quality**:
    -   **Accuracy**: Data recorded correctly.
    -   **Completeness**: All relevant data recorded.
    -   **Uniqueness**: Entities recorded once.
    -   **Timeliness**: Data is up-to-date.
    -   **Consistency**: Data agrees with itself.
-   **Problems with Conventional Definitions**:
    -   **Unmeasurable**: Accuracy and completeness are hard to measure.
    -   **Context Independent**: No consideration of what is important.
    -   **Incomplete**: Missing aspects like interpretability, accessibility, metadata, etc.
    -   **Vague**: No practical guidance for improving data.

## 2. **Data Wrangling Overview**

-   **Definition**: The process of transforming raw data into analyzable data for actionable insights.
-   **Synonyms**: Data preprocessing, preparation, cleansing, scrubbing, munging, transformation, ETL (Extract-Transform-Load).
-   **ETL**: Batch-oriented data integration for data warehousing.

## 3. **Data Wrangling Steps**

-   **Iterative Process**:
    -   Understand, Obtain, Explore, Transform, Augment, Shape, Visualize.
-   **Data Cleansing**: Detecting and correcting inaccurate or corrupt records.
    -   **Why Data is "Dirty"**: Dummy values, absence of data, violation of business rules, cryptic data, etc.
    -   **Steps in Data Cleansing**:
        -   **Parsing**: Identifying and isolating data elements.
        -   **Correcting**: Fixing parsed data using algorithms.
        -   **Standardizing**: Transforming data into consistent formats.
        -   **Matching**: Identifying and eliminating duplicates.
        -   **Consolidating**: Merging matched records into one representation.

## 4. **Understanding Data**

-   **Structured vs. Unstructured Data**: Examples include PDFs, free text, and encoded messages.
-   **Data Munging**: Potentially lossy transformations applied to data (e.g., removing punctuation, parsing, filtering).

## 5. **Missing Data**

-   **Detection**: Checking for gaps, duplicates, and inconsistencies.
-   **Types of Missing Data**:
    -   **Random**: Due to system failures.
    -   **Wrong Ingestion**: Errors during data ingestion (e.g., CSV to table).
    -   **Inapplicability**: Data not relevant to certain records.
-   **Imputing Missing Values**:
    -   **Standalone Imputation**: Mean, median, etc.
    -   **Better Imputation**: Using attribute relationships (regression, propensity scores).
    -   **Arbitrary Missing Pattern**: Markov Chain Monte Carlo (MCMC) for multivariate data.

## 6. **Censoring and Truncation**

-   **Censored Data**: Measurement is bounded but not precise.
-   **Truncated Data**: Data points dropped if they exceed or fall below certain bounds.
-   **Impact**: If the mechanism is unknown, analysis can be biased.

## 7. **Outliers**

-   **Definition**: Data points that deviate significantly from the expected.
-   **Types**: Error bounds, model-based, geometric, distributional, time series.
-   **Detection Methods**:
    -   **Control Charts**: Univariate and multivariate control charts.
    -   **Model Fitting**: Identifying outliers based on model residuals.
    -   **Set Comparison**: Comparing data sets to detect corrupt sections.

## 8. **Types of Data**

-   **Categorical**: Qualitative data (e.g., color).
-   **Quantitative**: Discrete (e.g., number of balloons) or continuous (e.g., pressure).

## 9. **Data Source Selection Criteria**

-   **Key Factors**: Credibility, compliance, completeness, cost, accurateness, legal issues, verifiability, security, currency, storage, accessibility, provenance.

## 10. **Data Tables and Normalization**

-   **Normalization**: Avoid duplication by structuring data properly.
-   **Key Problems**:
    -   **Matching Keys**: Aligning keys across multiple databases.
    -   **Duplicates**: Identifying and removing duplicate records.
-   **Lessons**:
    -   Each observation should be complete and atomic.
    -   Variables should belong to only one column.

## 11. **Schema-On-Write vs. Schema-On-Read**

-   **Schema-On-Write**: Traditional DBMSs enforce data consistency with a pre-designed schema.
-   **Schema-On-Read**: Data is applied to a schema as it is pulled from storage, allowing for more flexibility.

## 12. **Tools for Data Wrangling**

-   **Open Source Tools**: R, Python (Pandas), OpenRefine, Tesseract, BeautifulSoup.
-   **Commercial Vendors**: Trifacta, Paxata, Datameer, Datawatch.

## 13. **Hands-On Data Wrangling**

-   **Steps**:
    -   Data Ingestion, Cleansing, Exploration, Augmenting, Shaping.
-   **Common Tasks**: Handling missing values, outliers, formatting, and measurement units.

## 14. **R Libraries for Data Wrangling**

-   **Popular Libraries**: `stringr`, `dplyr`, `tidyr`, `readxl`, `lubridate`, `gtools`, `plyr`, `rvest`.
