# Sketchfab Search for Photoshop

Search downloadable model on Sketchfab right from Photoshop.

# Installing

This extension isn't signed, so you need to install it manually.

* On Mac:
  * In a terminal: `defaults write com.adobe.CSXS.7 PlayerDebugMode 1`
  * Copy this folder into `~/Library/Application Support/Adobe/CEP/extensions`
* On Windows:
  * In a terminal: `regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.7`
  * Copy this folder into: `C:\Users\{USER}\AppData\Roaming\Adobe\CEP/extensions`

Launch Photoshop. The extension should be available under Window > Extensions.

# Photoshop extensions docs

* [Create an HTML5 / JavaScript extension for Adobe Illustrator & Photoshop CC](https://medium.com/@jolg42/how-to-create-an-html5-javascript-extension-for-adobe-illustrator-photoshop-cc-78921802e248)
* [CEP Resources](https://github.com/Adobe-CEP/CEP-Resources)

# Development

The extension is made with Web technologies.
* `CSXS/manifest.xml` is the extension manifest that contains info about the extension
* `html/search.html` is the main panel
* `.debug` declares ports for remote debugging. When the extension is running, you can inspect the extension by going to [http://localhost:8007/](http://localhost:8007/) and clicking the first link.
* `js/ext.js` makes the extension adapt to its environment. It handles Photoshop themes (dark/light) and makes the extension persistent.
