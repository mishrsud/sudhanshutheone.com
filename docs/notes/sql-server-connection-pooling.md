---
title: SQL Server connection pooling
description: Understanding SQL Server connections, connection pooling and optimisation
date: 2019-04-24
tags: 
- SQL Server
- Enterprise patterns
- Best Practices
---

## What is connection pooling

## sp_reset_connection

[Stackoverflow Answer](https://stackoverflow.com/a/2924456/190476)

> sp_reset_connection indicates that connection pool is being reused. Data access API's layers like ODBC, OLE-DB and System.Data.SqlClient all call the (internal) stored procedure sp_reset_connection when re-using a connection from a connection pool. It does this to reset the state of the connection before it gets re-used, however nowhere is documented what things get reset. This article tries to document the parts of the connection that get reset.

