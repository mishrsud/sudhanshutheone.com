
Title: Logging Frameworks for .NET
Lead: A monologue about the available options when it comes to logging frameworks for .NET applications
Published: 2015-02-05
Tags: 
- .NET
- C#
- Logging
- instrumentation
---

### Introduction

Any application out in the real world needs good instrumentation so that when things go wrong (as they will from time to time), one has somewhere to start. Logging has long been a standard and time-tested way for recording context when your application runs into exceptions or suffers a crash. A good logging framework goes a long way in creating a well instrumented application that is easy to maintain. As the adage goes in developer-land, you may very well be the developer who maintains that app, so better prepare well for a rainy day - coz' when it rains, it pours!

As .NET is a mature framework, unsurprisingly there a gazillion enterprise grade logging frameworks available - both open source as well as commercial. When looking for a framework, my personal preference is that it should, at a bare minimum, have the following features:

1.  Be actively developed and supported (whether by a thriving and active community or an enterprise) - so that security issues and / or bugs get fixed promptly
2.  Provide a consistent API
3.  Be thread-safe
4.  Provide at least logging to file, eventlog and database out-of-the-box
5.  Be extensible/have a plugin or extensibility point so that custom behavior may be added

### And, The Nominees are

NLog and Log4Net are two of the most popular frameworks while MS Enterprise Library also provides a Logging Application Block that is pretty solid. While googling around, I found a commercial solution called SmartInspect that claims to be the super man of logging frameworks as it comes with some pretty awesome features - at a price though! (actually it has a per developer licence and at $199 looks quite pricey IMHO)

### Taking a logging framework home

Based on prior experience, I've found that it is a wise practice to abstract the core logging API into a custom interface so that your solution isn't tightly coupled with a logging implementation. You may then build on by creating a Factory that creates an instance of a LoggingAdapter that eventually calls into a concrete logger to log to a configured target (e.g. file).

Turns out there is already an open source library called Common.Logging that provides a simple logging abstraction to switch between different logging implementations. There is current support for log4net, NLog and Enterprise Library logging. The project is on [GitHub](https://github.com/net-commons/common-logging "Common.Logging on GitHub") and is actively developed.

### Log File Viewers

It is no good writing logs if you don't have a good viewer you can use to analyse those log files. Again, at a bare minimum, the viewer must be able to tail a log file (show active logs being written), and provide search and filtering. There are a lot of tools that make the cut:

1.  [BareTail](http://www.baremetalsoft.com/baretail/) from Bare Metal - Has a free as well as paid variant, provides color coding and search
2.  LogExpert - found [here](http://logexpert.codeplex.com/) - Free and open source, has custom columnizer so can process almost any format
3.  One could use a PowerShell cmdlet to tail log files as described [here](http://stackify.com/11-ways-to-tail-a-log-file-on-windows-unix/) - free but no colors here!
PS: The company that owns SmartInspect, Gu Rock, has a page that compares features of the most popular logging frameworks **[here](http://www.dotnetlogging.com/comparison/) **- please note that I have not verified the accuracy of the comparison, there may be changes

They also have a (claimed) comprehensive directory of logging tools [**here**](http://www.dotnetlogging.com/).


## Update: Reading this in 2017? Things have changed
The best instrumentation solution in 2017 is a combination of structured logging using [Serilog](https://github.com/serilog/serilog) and a log analysis system like ELK (Elastic Search, Logstash and Kibana) or [Seq](https://getseq.net/) blog post coming soon!

Happy Coding!