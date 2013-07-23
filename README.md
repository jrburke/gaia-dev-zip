## gaia-dev-zip

A utility for zipping up a development version of a
[Gaia](https://github.com/mozilla-b2g/gaia) app, so that it can be given to
a UX person for review.

Probably only useful if you are fixing things for Gaia and want to share
snapshots of that work with UX people for review.

It works by copying the existing gaia app in your tree to a new name of your
choosing, modifying the manifest.webapp to use the new name, and zipping up
the contents.

## Prerequisites

1) You need to be developing [Gaia](https://github.com/mozilla-b2g/gaia). If
you do not have Gaia set up, then do not bother trying to use this tool.

2) [Install Node](http://nodejs.org/). It runs this tool. There are
easy to use installers for the major OS platforms.

3) Have a usable `zip` implementaion on the command line. This tool uses
the OS zip tool on the command line.

## Installation

Open a command line terminal window and type:

    npm install -g gaia-dev-zip

This only works after Node has been installed.

## Creating a dev zip

Make sure you are in your local git clone of Gaia, in the **apps** directory.

The basic syntax for the tool:

    gaia-dev-zip appname devname

Where:

* appname: the name of the app folder you want to zip up.
* devname: the name to use for this snapshot. Best to use either the bugzilla
  bug ID or branch name.

For example: a snapshot of the email app that changes the background of the
app to red, and is tracked in bug 12345:

  gaia-dev-zip email bug12345-redbg

When the tool is done, there will be a **bug12345-redbg.zip** folder in the
apps directory. Upload this somewhere and give the UX person a link to that
zip file.

## UX workflow

### Prequisites

1) Make sure in your desktop Firefox, you have installed the
[Firefox OS Simulator](https://addons.mozilla.org/en-us/firefox/addon/firefox-os-simulator/).
It is a large install, may take a moment.

2) Make sure you have a phone that has a Nightly build of Firefox OS. The
developer is likely using something like the Nightly build to test their
changes. If they have a specific version of B2G you should use to test, they
should tell you.

3) Make sure **Remote Debugging** is enabled on the phone. This is found on the
phone in the **Settings** app under:

    Device Information -> More Information -> Developer -> Remote Debugging

Make sure that checkbox is checked.

### Installing a dev snapshot of an app

1) The developer gives you an URL to a .zip file for the app.

2) Use your **desktop Firefox** to navigate to the zip file. Choose to save
the file to your desktop.

![save zip]()

3) Open the folder on your desktop that has the downloaded zip file.

4) Double-click on the .zip file to unzip it. This should create a directory
in your downloads folder.

5) Open the **Firefox OS Simulator** in your desktop Firefox, found in the menu
items at:

    Tools -> Web Developer -> Firefox OS Simulator

6) In teh Simulator, click the **Add Directory** button, and find the folder
you unzipped in your downloads folder, and select the **manifest.webapp** file
inside that folder.

7) The Simulator will start running. You can either use it to validate the app,
or you can just close it if you want to test on the device.

8) Make sure your phone is attached via USB. The Simulator tab will show
**Device connected** if it detects the device.

9) In the Simulator tab, click the **Push** button to push the app to your
phone.

10) Make sure the phone is on, and unlocked. It may tell you that:

    An incoming requets to permit remote debugging was detected.
    Allow connection?

Select OK. If you do not select OK in time, the Simulator tab will show a
"timeout" error. If that happens, just try again.

**Cleanup**:

On phone:

* long tap on the application icon, to bring up the delete UI, delete it.

On desktop:

* In the Simulator tab, you can click the X button to remove it from the
simulator. Refresh the tab to get rid of the entry.

* You can now delete the .zip file and unzipped directory from your download
folder.





