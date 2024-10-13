---
Title: A look at the leading tools for build automation for .NET Projects
Lead: .
Published: 2019-06-17
Tags:
  - .NET
  - Continuous Integration
  - Build Automation
  - CSharp
---

## Scripting the build, test, version and package/artefact stages

### The candidates

- [Cake](https://cakebuild.net)
- [nuke](https://www.nuke.build)
- Bash/Powershell scripts

### The motivation for scripted build

Quoting from Andrew Lock's [blog](https://andrewlock.net/building-asp-net-core-apps-using-cake-in-docker/) on building an ASP.NET Core app using Cake:

> Scripting the build is the answer when there is a standard set of commands to run. This can be done using a scripting language such as bash or powershell or a specialised, cross platform tool such as Cake.

### Build automation systems

Cake, Nuke, Psake and Fake have comparable features and it is mostly a matter of personal preference. The first two, Cake and Nuke use a C# DSL - which is great as you then use the same tools and tech to script builds as the rest of your software.

I love Cake and its rich eco system of plugins as well as extensibility features. The only minor complaint I have is that it is not able to use the IDE tooling (barring syntax highlights and basic intellisense).
This is where Nuke truly shines as you're writing plain C# and hence get all the goodness of refactor, rename, go to definition etc. Nuke also comes with a CLI bootstrapper to initialise your build script. You would install the "nuke.globaltool" as a dotnet core global tool like so:

```bash
$ dotnet tool install nuke.globaltool

# bootstrap a build script. This command triggers a CLI wizard that asks a bunch of questions and emits a C# console app project containing the build script
$ nuke :setup
```

Once setup, a build can be triggered by executing the command nuke from the command line from the directory containing the .nuke hidden file.

```bash
# run build
$ nuke
```

## Pipeline as code with TeamCity

- Configuring build pipeline using Kotlin [in TeamCity](https://blog.jetbrains.com/teamcity/2019/03/configuration-as-code-part-1-getting-started-with-kotlin-dsl/)

### Lessons Learned

As of version 2019.1, there is no way to import settings in Kotlin format exported from an existing project to create a new project. Instead, these steps worked for me:

- On an existing project, click on "Edit Project" (Top right corner)
- On the right corner, find the "Actions" menu and click on the "Download settings in Kotlin format" submenu. This will download a ZIP file containing the following files:
  - pom.xml: The maven build file
  - README
  - settings.kts: This is the Kotlin script describing the build pipeline
- Create a new project in TeamCity by using the "From a repository URL" option.
- Assuming git as the version control, create a git repo for your project that would be built by TeamCity.
  - create a **.teamcity** directory at the root of the project, at the same level as .git folder
  - Enter the URL to this git repo in the "Repository URL" box. Enter a username and password if this repo requires authenticated access. Alternatively, an SSH key may be used as the auth mechanism.
- Importing this repo would lead TeamCity to detect the Kotlin scripts and the UI would reflect Build Configurations and Build Steps based on the .kts file

> NOTE: To have TeamCity ingest and show test run information, use the TeamCity.VSTest.TestAdapter nuget package in your test projects. To see the TeamCity logger in action on your local system command line, set the TEAMCITY_VERSION environment variable. See [this github issue](https://github.com/JetBrains/TeamCity.VSTest.TestAdapter/issues/33).

Build scripts can interact with TeamCity using [Service Messages](https://www.jetbrains.com/help/teamcity/build-script-interaction-with-teamcity.html#BuildScriptInteractionwithTeamCity-ServiceMessages)
