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
Mac OSX is based on BSD. Most terminal commands work similar with a few variations.

## Environment variables
### Setting up permanent variables

1. Manual way: open up /Users/username/.bash_profile and add a line like so:
```bash
export MYVARIABLE=value
```
Create the .bash_profile file if it does not already exist at the location specified above.

2. Alternative
Described [here](https://stackoverflow.com/a/588442/190476)
```bash 
launchctl setenv MYVARIABLE "value"
```
OR create a file launchd.conf : /etc/launchctl.conf
```bash 
setenv JAVA_VERSION 1.6
```

3. Script
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