## gaia-dev-zip

A utility for zipping up a development version of a
[Gaia](https://github.com/mozilla-b2g/gaia) app, so that it can be given to
a UX person for review.

Probably only useful if you are fixing things for Gaia and want to share
snapshots of that work with UX people for review.

It works by copying the existing gaia app zip in your Gaia clone's
`profile` directory to a new name of your choosing, modifying the
manifest.webapp to use the new name, and zipping up the contents.

If you are developer, see the **For the developer** section. If you are a
UX person, see **For the UX person**.

## For the developer

### Prerequisites

1) You need to be developing [Gaia](https://github.com/mozilla-b2g/gaia). If
you do not have Gaia set up, then do not bother trying to use this tool.

2) [Install Node](http://nodejs.org/). It runs this tool. There are
easy to use installers for the major OS platforms.

3) Have a usable `zip` implementaion on the command line. This tool uses
the OS zip tool on the command line.

### Installation

Open a command line terminal window and type:

    npm install -g gaia-dev-zip

This only works after Node has been installed.

### Creating a dev zip

Make sure you are in your local git clone of Gaia..

The basic syntax for the tool:

    gaia-dev-zip path/to/application.zip devname

Where:

* **ath/to/application.zip**: the path to the application.zip file that is in
the **profile/webapps** directory
* **devname**: the name to use for this snapshot. Best to use either the
bugzilla bug ID or branch name.

For example: a snapshot of the email app that changes the background of the
app to red, and is tracked in bug 12345:

    gaia-dev-zip profile/webapps/email.gaiamobile.org/application.zip bug12345-redbg

When the tool is done, there will be a **bug12345-redbg.zip** folder in the
current directory. Upload this somewhere and give the UX person a link to that
zip file.

## For the UX person

These instructions are for Gaia 1.2 and later. For Gaia 1.1 and before, see
the deprecated instructions at the end of this document.

### Prerequisites

1) **On your desktop**: Firefox 26 or later. You may need to download
[Firefox Aurora](http://www.mozilla.org/en-US/firefox/aurora/) to get it.
The main point is to get a Firefox version with the App Manager. Click this
[about:app-manager](about:app-manager) link to see if you have it in your
desktop browser.

Read the [Using the App Manager](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_the_App_Manager) page to do the rest of the
setup. In particular, make sure you:

* Use the [ADB helper add-on](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_the_App_Manager#Adb_Helper_Add-on)
* Do the
[Debugging Certified Apps](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_the_App_Manager#Debugging_Certified_Apps)
steps. Gaia apps are usually certified apps.

**Note**: If you flash Gaia, you will likely need to do the
[Debugging Certified Apps](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/Using_the_App_Manager#Debugging_Certified_Apps)
again. That preference is reset which each Gaia flash.

### Installing a dev snapshot of an app

1) The developer gives you an URL to a .zip file for the app.

2) Use your **desktop Firefox** to navigate to the zip file. Choose to save
the file to your desktop.

![download zip](https://raw.github.com/jrburke/gaia-dev-zip/master/images/download-zip.png)

3) Open the folder on your desktop that has the downloaded zip file.

![show downloads](https://raw.github.com/jrburke/gaia-dev-zip/master/images/show-downloads.png)

4) Double-click on the .zip file to unzip it. This should create a directory
in your downloads folder.

![unzipped dir](https://raw.github.com/jrburke/gaia-dev-zip/master/images/unzipped-dir.png)

5) In the [App Manager](about:app-manager), be sure you are in the **Apps** section of the UI, and click the **Add Packaged App** link. Find the directory you just unzipped from the zip file.

6) Click the **Update** button in the App Manager UI to push the app over to your device (assuming you have already connected to the device via USB cable and the App Manager shows *Connected to B2G* in the lower left).

## For the UX person (Gaia 1.1 and lower)

**This section is deprecated**, see the other UX section for how to work with
Gaia 1.2+.

### Prerequisites

1) Make sure in your **desktop Firefox**, you have installed the
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

![download zip](https://raw.github.com/jrburke/gaia-dev-zip/master/images/download-zip.png)

3) Open the folder on your desktop that has the downloaded zip file.

![show downloads](https://raw.github.com/jrburke/gaia-dev-zip/master/images/show-downloads.png)

4) Double-click on the .zip file to unzip it. This should create a directory
in your downloads folder.

![unzipped dir](https://raw.github.com/jrburke/gaia-dev-zip/master/images/unzipped-dir.png)

5) Open the **Firefox OS Simulator** in your desktop Firefox, found in the menu
items at:

    Tools -> Web Developer -> Firefox OS Simulator

6) In the Simulator, click the **Add Directory** button, and find the folder
you unzipped in your downloads folder, and select the **manifest.webapp** file
inside that folder.

![fxos simulator](https://raw.github.com/jrburke/gaia-dev-zip/master/images/fxos-simulator.png)

7) The Simulator will start running. You can either use it to validate the app,
or you can just close it if you want to test on the device.

8) Make sure your phone is attached via USB. The Simulator tab will show
**Device connected** if it detects the device.

9) In the Simulator tab, click the **Push** button to push the app to your
phone.

![push](https://raw.github.com/jrburke/gaia-dev-zip/master/images/push.png)

10) Make sure the phone is on, and unlocked. It may ask you:

    An incoming requets to permit remote debugging was detected.
    Allow connection?

Select OK. If you do not select OK in time, the Simulator tab will show a
"timeout" error. If that happens, just try again.




