# Awesome-webcomponents Introduction and Hello World app/site

This tutorial created by [@RIAEvangelist](https://github.com/RIAEvangelist), feel free to contact me with questions.

### Why did I create Awesome-webcomponents?

I wanted a simple to use library / framework that would let the community use or extend it to quickly and easily for native ES6 apps. I primarily wanted to support [electron](http://electron.atom.io/), Cordova, and modern browsers without needing transpilers, or complicated tool chains. I found that these tool chains can lead us into developing in a way that is not native to the browser and mentally boxes us in, tightly coupling our apps to only working in one tool chain like webpack or babel, which are awesome for many needs, but over complicate and confuse many people. Sometimes simpler really is better.

I am a big fan of the [KISS Method](https://www.youtube.com/watch?v=hoj5Scm7HaY). :point_left: Lots of people feel like that video with today's JS tools. But feel free to use awesome along side of any app bundled with an advanced tool chain. If you dig into the code just a bit, you will see we use some isomorphic libraries under the hood as well.

### Why did I call it awesome?

I didn't want to spend time thinking up a better name, and the idea seems pretty awesome. Hopefully it will be awesome for you to use as well. Or maybe I'm just a :shit: ...

### Who the hell am I?

Just some guy who develops stuff he needs and shares it with the world. Sometimes people like it and use it. At the time of writing this I am also working on building a bionic eye, which is working out pretty well. [Here's a video of a blind person skiing with the bionic eye.](https://www.youtube.com/watch?v=dTxcPhSKoig)

* [My npm account](https://www.npmjs.com/~riaevangelist)
* [My npm stats](http://npm-stat.com/charts.html?package=&author=riaevangelist&from=2014-01-2&)
* [My linkedin](https://www.linkedin.com/in/electriccowboy)
* [My Twitter @electricCowboyR](https://twitter.com/electricCowboyR)
* [My company - DigiNow.it](http://diginow.it/)


### Awesome Hello World

#### Prerequisites

1. bower must either exist in your project or be installed globally via ` npm i -g bower `

#### Setup

1. make a new dir for your project
2. copy the [000-boilerplate index.html](https://github.com/RIAEvangelist/awesome-webcomponents/blob/master/tutorials/000-boilerplates/index.html) to your projects new dir as a starting point
3. goto your projects dir in the terminal
4. run ` bower init ` and hit enter for all questions until : ` would you like to mark this package as private which prevents it from being accidentally published to the registry? (y/N) `. At this question and the next hit ` y `.
4. run ` bower install awesome-webcomponents `
5. replace the ` ????BOWER???? ` with ` ./bower_components ` since we just installed them in the same dir.
6. change the title to whatever you want in the title tag

#### JS

In the empty script tag add

```javascript

awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);

```

This will include the dialog component.

#### html

Add an ` awesome-dialog ` to the body.

```HTML

<awesome-dialog>
</awesome-dialog>

```

![empty dialog](https://raw.githubusercontent.com/RIAEvangelist/awesome-webcomponents/master/tutorials/001-awesome-hello-world/img/empty.png)

That will render an empty dialog to the page. Next populate the dialogs icon and data attributes next.

```HTML

<awesome-dialog
    data-icon='./img/yao.png'
    data-title='Hello World'
>
</awesome-dialog>

```

![title dialog](https://raw.githubusercontent.com/RIAEvangelist/awesome-webcomponents/master/tutorials/001-awesome-hello-world/img/header.png)

Now the dialog will have an icon and title in it's header. Lets give it some content next, maybe a funny video from youtube? Awesome Components that support injecting content should always do so via a template object. This prevents [FOUSC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
( Flash Of Unstyled Content ) and allows the component to remember your injected content if it ever needs to re-render itself.

```HTML

<awesome-dialog
    data-icon='./img/yao.png'
    data-title='Hello World'
>
    <template>
        <!-- the expert (funny) -->
        <iframe style='width:100%;height:calc(100% - 3.8em);' src="https://www.youtube.com/embed/BKorP55Aqvg" frameborder="0" ></iframe>
    </template>
</awesome-dialog>


```

Now we see we have a video inside of our dialog with the image and title in the header.

![title dialog](https://raw.githubusercontent.com/RIAEvangelist/awesome-webcomponents/master/tutorials/001-awesome-hello-world/img/video.png)


### Finished Hello World

[the index.html code should now look like this](https://github.com/RIAEvangelist/awesome-webcomponents/blob/master/tutorials/001-awesome-hello-world/index.html)

```html

<html>
    <head>
        <meta charset="utf-8">

        <!-- basic viewport to support desktop and mobile -->
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

        <title>Tutorial 001 - Awesome Introduction and Hello World</title>

        <!-- include polyfill for close to modern browsers -->
        <script src='./bower_components/document-register-element/build/document-register-element.js'></script>

        <!-- Include awesome.js -->
        <script type='application/javascript' src='./bower_components/awesome-webcomponents/awesome.js'></script>


        <!-- get awesome stuff -->
        <script type='application/javascript'>
            awesome.requireScript(`${awesome.path}components/dialog/awesome-dialog.js`);
        </script>

    </head>
    <body>

        <!-- make something awesome -->
        <awesome-dialog
            data-icon='./img/yao.png'
            data-title='Hello World'
        >
            <template>
                <!-- the expert (funny) -->
                <iframe style='width:100%;height:calc(100% - 1.25em);' src="https://www.youtube.com/embed/BKorP55Aqvg" frameborder="0" ></iframe>
            </template>
        </awesome-dialog>


    </body>
</html>



```
