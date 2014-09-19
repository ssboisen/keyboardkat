# KeyboardKat

KeyboardKat is a simple library for handling keyboard shortcuts in JavaScript that builds on top of the excellent [Mousetrap](https://github.com/ccampbell/mousetrap) library by Craig Campbell.

It adds a few features on top of those already available in Mousetrap but support the same api as Mousetrap for a drop-in replacement.

It is licensed under the Apache 2.0 license.

It is around **2.6kb** minified and gzipped and **5.9kb** minified, when embedding Mousetrap.

If you would like to donate to help support Mousetrap development use [Gittip](https://www.gittip.com/ccampbell).

## Getting started

1.  Include mousetrap on your page before the closing ``</body>`` tag

    ```html
    <script src="/path/to/keyboadkat-combined.min.js"></script>
    ```

2.  Add some keyboard events to listen for

    ```html
    <script>
        // single keys
        KeyboardKat.bind('4', function() { console.log('4'); });
        KeyboardKat.bind("?", function() { console.log('show shortcuts!'); });
        KeyboardKat.bind('esc', function() { console.log('escape'); }, 'keyup');

        // combinations
        KeyboardKat.bind('command+shift+k', function() { console.log('command shift k'); });

        // map multiple combinations to the same callback
        KeyboardKat.bind(['command+k', 'ctrl+k'], function() {
            console.log('command k or control k');

            // return false to prevent default browser behavior
            // and stop event from bubbling
            return false;
        });

        // gmail style sequences
        KeyboardKat.bind('g i', function() { console.log('go to inbox'); });
        KeyboardKat.bind('* a', function() { console.log('select all'); });

        // konami code!
        KeyboardKat.bind('up up down down left right left right b a enter', function() {
            console.log('konami code');
        });
    </script>
    ```
## Why KeyboardKat?

Mousetrap is an excellent library, probably the best keybinding library available ([read more why here](https://github.com/ccampbell/mousetrap#why-mousetrap)).

However it is missing a few features that can be useful to have. 

If you need to have multiple bindings for the same keys maybe even for different sections of your application KeyboardKat is for you.

With *flaps* you can namespace your callback bindings such that KeyboardKat has to be using that specific flap in order to execute those callbacks.

