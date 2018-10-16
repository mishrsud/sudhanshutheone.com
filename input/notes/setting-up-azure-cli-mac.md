---
title: Setting up Azure CLI on mac
---

## Setting up Azure CLI on Mac
Azure CLI is a cross platform CLI that can be used to automate all things Azure as well as one-off interactions with Azure. The best way to install is using Homebrew.

## Step-by-step
1. Install homebrew (if you don't already have it)
2. Install Azure CLI
```bash
brew update && brew install azure-cli
```

## Troublehsooting
If you receive errors during brew install that complaint about permissions, read carefully the path to which permission is denied. The usual brew way is to download a formulae, build a keg and then create a symbolic link. Permission issues usually occur if your current user does not have write access to:
/usr/local/Cellar
/usr/local/Frameworks
etc...
These messages are usually of the form
```
Linking /usr/local/Cellar/python/3.7.0... Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```
To fix this, create the directory manually and change ownership to the user in question.
E.g.
```bash
sudo mkdir /usr/local/Frameworks
sudo chown user:group /usr/local/Frameworks
```

## Configure az cli
To configure the cli:
```bash
az configure
```
This will store settings at **/Users/username/.azure/config**

## References
[Microsoft Docs to setup Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos?view=azure-cli-latest)