---
Title: Handling Date and Time with Timezone awareness correctly in .NET
Lead: The DateTime type isn't enough for an application that needs to work with different timezones. You want a consistent way of handling date/time on the server and on the client.
Published: 2019-01-15
Tags:
  - .NET Core
  - Datetime
  - CSharp
---

### Problem statement

- Calendar time vs instantaneous time: [Stackoverflow](https://stackoverflow.com/a/14268167)

The TimezoneInfo class and most important methods

- ConvertTimeToUtc(DateTime dateTime, TimeZoneInfo sourceTimeZone)
- DateTime ConvertTimeFromUtc(
  DateTime dateTime,
  TimeZoneInfo destinationTimeZone)
- Fallacy of DateTime.ToUniversalTime(): [GIST](https://gist.github.com/mishrsud/d2189edc39ec73e4094566597070fc66)

Using DateTimeOffset to encapsulate both the date/time and the UTC offset of the timezone in question

Write tests to ensure your conversions of date time from and to UTC work as expected, and run the tests with host set to different time zones. (a host running in Sydney timezone vs a host running in UTC)
