---
Title: NOSQL or RDBMS? Is that the right question to ask?
Lead: I often hear developers debate passionately on how one of NOSQL database is the silver-bullet for scalable applications/services. The reality isn't so black and white after all.
Published: 2019-06-11
Tags: 
- NOSQL
- RDBMS
- Database
- Design and architecture
- concepts
---

## Summary
When choosing a datastore for your next application or service, one may land on a choice of whether to use an RDBMS or NOSQL. The fact of the matter is, design choices are never binary and must always take into account trade offs.
The right question to ask then isn't whether you need MongoDB or SQL Server, rather ask (not exhaustive):
- What type of data would I need to store?
- Is my application read heavy or write heavy or a mix of both?
- How will my data and schema evolve?
- What scale will my app need and how will this change in the foreseeable future?
- Would you need ACID compliant database?
- Would you need transactions?

## Common myths

- RDBMS databases do not scale
- NOSQL databases scale in all use cases
- Changing schema in relational databases is prohibitively hard
- NOSQL databases do not require data/schema migration at all

## Some thought provoking posts on NOSQL and RDBMS

- [BJ Clark's Blog: NoSQL: If Only It Was That Easy](https://markedaspertinent.wordpress.com/2009/08/04/nosql-if-only-it-was-that-easy/)
- [Answer on Software Engineering Stackexchange](https://softwareengineering.stackexchange.com/a/54389/75945)