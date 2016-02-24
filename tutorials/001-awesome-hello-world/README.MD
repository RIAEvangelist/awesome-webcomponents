# Awesome-webcomponents Introduction and Hello World app/site

This tutorial created by [@RIAEvangelist](https://github.com/RIAEvangelist), feel free to contact me with questions.

### Why did I create Awesome-webcomponents?

I wanted a simple to use library / framework that would let the community use or extend it to quickly and easily for native ES6 apps. I primarily wanted to support [electron](http://electron.atom.io/), Cordova, and modern browsers without needing transpilers, or complicated tool chains. I found that these tool chains can lead us into developing in a way that is not native to the browser and mentally boxes us in, tightly coupling our apps to only working in one tool chain like webpack or babel, which are awesome for many needs, but over complicate and confuse many people. Sometimes simpler really is better.

I am a big fan of the [KISS Method](https://www.youtube.com/watch?v=hoj5Scm7HaY). :point_left: Lots of people feel like that video with today's JS tools. But feel free to use awesome along side of any app bundled with an advanced tool chain. If you dig into the code just a bit, you will see we use some isomorphic libraries under the hood as well.

### Why did I call it awesome?

I didn't want to spend time thinking up a better name, and the idea seems pretty awesome. Hopefully it will be awesome for you to use as well. Or maybe I'm just a :shit: ...

### Awesome Hello World

```html

<html>
    <head>
        <meta charset="utf-8">

        <!-- basic viewport to support desktop and mobile -->
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

        <title>Tutorial 001 - Awesome Introduction and Hello World</title>

        <!-- include polyfill for close to modern browsers -->
        <script src='????BOWER????/document-register-element/build/document-register-element.js'></script>

        <!-- Include awesome.js -->
        <script type='application/javascript' src='????BOWER????/awesome_webcomponents/awesome.js'></script>


        <!-- get awesome stuff -->
        <script type='application/javascript'>

        </script>

    </head>
    <body>

        <!-- make something awesome -->



    </body>
</html>


```
