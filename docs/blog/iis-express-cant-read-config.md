---
title: IIS Express 500.19 Cannot read configuration file - because it's looking at the wrong path!
description: Getting out of a vicious and unnerving IIS express issue
date: 2016-08-23
tags:
  - ASP.NET
  - IIS-Express
  - Web-Development
---

## Huston, we have a situation!

While working on an ASP.NET MVC 5 solution in VS 2015 I was happily refactoring the code and needed to debug some code in the Global.asax.cs. I thus changed the project properties to run using IIS Express instead of local IIS.
> [If you're wondering why IIS Express for debugging the startup code, check out this excellent post from Rick Strahl that goes over various ways you can debug initialization code [HERE](https://weblog.west-wind.com/posts/2011/Dec/15/Debugging-ApplicationStart-and-Module-Initialization-with-IIS-and-Visual-Studio)]

## The Issue

Now, every time I tried running with a debugger attached (F5), I got hit by a 500.19 error code that basically seemed to suggest that my web.config is fried. At first, I tried commenting various sections in web.config to ensure I haven't messed up any config but couldn't spot anything that would cause the breakage.

What do programmers do when stuck (and when all attempts to restore sanity fail)? Well, no prizes for guessing, Google for a stackoverflow thread that (fingers crossed) has a solution. Luckily, I didn't have to strain my fingers much as a gentleman had graciously shared [this on StackOverflow](http://stackoverflow.com/a/37784901/190476)

## The Solution: Look at thy hidden folders

It turns out, with VS 2015, the visual studio team listened to many developers like [Mr. Balassy](https://gyorgybalassy.wordpress.com/2015/03/06/i-asked-for-a-vs-folder-and-the-vs-team-gave-it-to-me/) and added the .vs folder to hold (almost) all of the per-user settings files - the likes of user options (.suo) et al. One of these is the _**applicationHost.config** _to control machine level IIS Express settings for the current solution. This file resides at the following place: your solution root (the place where .sln file lives) --> .vs --> config --> applicationhost.config. As visual studio can recreate this file and the entire .vs folder again, the straightforward (and easy ;-)) solution is to

1.  Close the solution
2.  Delete the .vs folder
3.  Reopen the solution again and in the web project settings, re-configure to debug with IIS express.
Unless you're having a really bad dream, you should have lift-off at this stage.

**Further Reading**

About [applicationhost.config on Technet](http://www.iis.net/learn/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig)

Good Luck!
