---
Title: Setting up environment variables on Mac 
Lead: How to setup environment variables on Mac OSX
Published: 2018-10-14
Tags: 
- OSX
- Mac
- Macbook 
- Linux
- Bash
---

## Basics
Mac OSX is [based on BSD](https://en.wikipedia.org/wiki/Architecture_of_macOS). Most terminal commands work similar with a few variations.

## Environment variables
### Setting up permanent variables

**NOTE** I've found that irrespective of how the variables are set, the terminal session needs to be quit and relaunched for the SET or UNSET to reflect. In case of applications that need to read the variables, you need to quit and relaunch the application.

1. **Manual way**: open up __/Users/username/.bash_profile__ and add a line like so (create the .bash_profile file if it does not already exist at the location specified above):
```bash
export MYVARIABLE=value
```
The ```.bash_profile``` is a shell script that is executed when a terminal session starts.

2. Alternative
Described [here](https://stackoverflow.com/a/588442/190476). Especially useful if you need GUI applications launched via spotlight (Launched via CMD+Space shortcut) to be able to use environment variables.
```bash 
launchctl setenv MYVARIABLE "value"
```

3. OR create a file launchd.conf : /etc/launchctl.conf and place a line as shown below:
```bash 
# will set an environment variable named JAVA_VERSION globally for all users
setenv JAVA_VERSION 1.6
```

4. Script
```bash
#!/usr/bin/env bash

# Stackoverflow: 
# MYVARIABLE+x is shell expansion
if [ -z ${MYVARIABLE+x} ] 
then
    echo "MYVARIABLE is unset, setting it now";
    echo 'export MYVARIABLE=whatevervalue' >>~/.bash_profile
else 
    echo "MYVARIABLE is set to '$MYVARIABLE'"; 
fi
```
**NOTE** the current shell session needs to be restarted for changes to take effect. This can be done by closing and reopening the terminal or by typing ``` source ~/.bash_profile ```

Hope that helps!

SM