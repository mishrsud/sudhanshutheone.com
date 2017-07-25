Title: Taming bash on Ubuntu on Windows 10 Creators Update!
Lead: For the uninitiated, you can now run a real bash prompt on Windows 10 Anniversary Update or higher. Let's try to make sense of what's going on with that! 
Published: 7/7/2017
Tags:
  - windows10 
  - wsl
---

---

# The Windows Subsystem for Linux

For the uninitiated, starting Windows 10 [Anniversary update](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update/) Windows 10 offered a Linux bash shell for everyone who would take it. It's an optional feature that requires Developer mode to be turned on. Then, once the required packages are setup by windows, you open "Turn Windows features on or off" dialogue (if you type Turn windows, that's the first option that shows up), look for "Windows Subsystem for Linux" and check the box. This installs the feature and then you're asked to reboot. Once the computer comes back up, you open a command prompt and type bash. This action calls ##lxrun.exe## which has been placed in your C:\Windows\System32 folder by installing the Windows subsystem for Linux feature. [This FAQ ](https://msdn.microsoft.com/en-us/commandline/wsl/faq) lists the most important concepts behind WSL. In a gist, here's the most important things to note:

1. What you get with WSL is a Ubuntu User mode image running atop Windows. This is not a virtual machine but native Linux [ELF binaries](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) running on windows.
2. Windows developed the technology to let Ubuntu binaries call into the Windows kernel.
3. This is nothing like cygwin (the environment git bash brings to windows). Cygwin involves a re-write of linux programs as windows executables. The behave the same, but there's obviously subtle differences and not everything is available.
4. With the anniversary update, you get an Ubuntu 14.04 image. To upgrade to a more recent version like Ubuntu 16.04, you'd need to upgrade to the creators update. More details follow.

# Windows Creators Update

In April 2017, [Windows 10 Creators update](https://blogs.windows.com/windowsexperience/2017/04/11/whats-new-in-the-windows-10-creators-update/) started rolling out. Depending on one's preferences you may or may not have received the update yet. This  also depends on your group policy if your PC is part of a corporate network where an administrator controls the rollout of updates. Here's how you get the update if you haven't got it already: [Get Creators Update](https://www.microsoft.com/en-us/software-download/windows10)
Note that this is a web based install. If you'd rather update offline, there's an option to download an ISO (disc image). Also keep in mind that the web based update can take a really long time depending upon your internet speed. (In other words, once set in motion, your computer would be busy updating for at least a couple of hours.)

Now my primary reasons to upgrade were two pronged:
1. To be able to run the latest version of Docker for windows
2. Upgrade the bash shell to Ubuntu 16.04

Once updated, I followed the advise to get Ubuntu 16.04 binaries by executing the following commands from the native Windows Command prompt:

```bash
# Remove the old Ubuntu image
C:\> lxrun /uninstall /full

# Install the latest image
C:\> lxrun /install
```
I wasn't so lucky with the second command! I started getting the following errors:

```bash
-- Beta feature --
This will install Ubuntu on Windows, distributed by Canonical
and licensed under its terms available here:
https://aka.ms/uowterms

Downloading from the Windows Store... 100%
Error: 0x80070002
```

Now as an experienced developer, I knew that since its been a couple of months since the release of creators update, there would be other who would've run into this issue and at least one who would've found a solution. You see, the difference between a seasoned dev and a newbie is in their google (or DuckDuckGo if you're like me) search skills :-). My search landed on [this github issue](https://github.com/Microsoft/BashOnWindows/issues/4). Unfortunately, none of the steps worked for me. I've mentioned the thread nevertheless because I learnt a lot of things like the lxrun program, resetting the default unix user on bash and the existence of an [offline installer](https://github.com/DDoSolitary/LxRunOffline). 

The solution that worked for me though was inspired from this [github thread](https://github.com/Microsoft/BashOnWindows/issues/524) and is summarised as follows:

1. Open windows firewall settings (Windows key, then type firewall)
2. Click on "Allow an app or feature through Windows firewall"
3. Add C:\Windows\System32\lxrun.exe to the list of allowed apps.
4. Now from command prompt, lxrun /install. Good things will happen. I promise. 

Once the wheels have spun, thou shalt have bash from Ubuntu 16.04 user mode running on thouest Windows. To verify, press windows key and type bash, then select "Bash on Ubuntu on Windows" and execute this command:

```bash
myawsm@superawsm: $ lsb_release -a # Linux Standard Base release, display all info

```
This should print the following info:

```
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 16.04.2 LTS
Release:        16.04
Codename:       xenial
```

Have Fun!

References:
- Ubuntu's account of the [Windows Subsystem for Linux](https://insights.ubuntu.com/2016/03/30/ubuntu-on-windows-the-ubuntu-userspace-for-windows-developers/)
- You may want to change your Windows DNS server as [explained here](http://solverbase.com/w/Windows_10:_Changing_DNS_Servers) - gives your internet speed a bit more juice as DNS is the first hit when you try to access any internet resource.