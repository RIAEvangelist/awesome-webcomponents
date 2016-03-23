# Awesome-Webcomponents

Awesome ES6 compliant web componants for use in your app or website.

Tested and working on :
* Chrome
* Chromium
* Android Chrome
* FireFox >=45
* IE Edge
* [Electron](http://electron.atom.io/)
* [NW.js](http://nwjs.io/)

Firefox >=45 supports evrything needed with the included ` ./bower_components/document-register-element/build/document-register-element.js `.
IE Edge ` Array.prototype.includes ` polyfill is build into awesome.js

install awesome-webcomponents via bower for your project by running ` bower install awesome-webcomponents ` don't forget to run ` bower update ` on occasion to get the latest version!

### Working Component Examples and Demos
[awesome-webcomponents on github.io](https://riaevangelist.github.io/awesome-webcomponents/)
#### Licensed under DBAD license
See the [DBAD license](https://github.com/philsturgeon/dbad) in your language or our [licence.md](https://github.com/RIAEvangelist/awesome-webcomponents/blob/master/LICENSE.md) file.

# Contributing
1. Fork the repo
2. Do awesome stuff!
3. Submit a Pull Request
4. Feel Awesome!

# [See Full JS DOCS for awesome-webcomponents](https://github.com/RIAEvangelist/awesome-webcomponents/tree/master/docs/jsDocs)

These are the documents generated from the code. It has a lot of detailed info.

# Documentation Table Of Contents

- [Getting started]('#getting-started')

# Getting started

1. Make sure you have bower installed ` npm install -g bower `
1. install or update awesome-webcomponents ` bower install awesome-webcomponents ` ***or update if already installed*** ` bower update `
1. set up your html as follows for a hello world

```html

<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <title>awesome.js hello world</title>

        <!--
            include awesome before trying to use anything that needs awesome
        -->
        <script type='application/javascript' src='./awesome.js'></script>

        <!--
            include awesome components you want to use in this HTML file
        -->
        <script type='application/javascript'>
            awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);
        </script>
    </head>
    <body>

        <!--
            add desired component to page
        -->
        <awesome-dialog
            data-title='Hello World'
        >
            <template>
                <h1>Hello World</h1>
            </template>
        </awesome-dialog>
    </body>
</html>


```
