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

Mousetrap is an excellent library, probably the best keybinding library available ([read why here](https://github.com/ccampbell/mousetrap#why-mousetrap)).

However it is missing a few features that can be useful to have. 

If you need to have multiple bindings for the same keys and the ability to toggle sets of bindings on and off at will KeyboardKat is for you.

With *flaps* you can namespace your callback bindings such that KeyboardKat has to be using that specific flap in order to execute those callbacks.

## Documentation

Documentation about Mousetrap can be found [here](http://craig.is/killing/mice).

### KeyboardKat.bind(keys[, flap][, action], callback)

Takes keys, optional flap and action as well as a callback and binds the keys to the callback. If no flap is provided the callback will be registered to the default `all` flap. Bindings with the `all` flap are always invoked. For information about how to format keys see the Mousetrap documentation.

Returns a function that can be called inorder to unbind that specific callback.

### KeyboardKat.bindGlobal(keys[, flap][, action], callback)

Works exactly as bind with the exception that globally registered bindings also trigger when the source of the key-strokes are textarea, select or input fields.

### KeyboardKat.unbind(keys[, flap])

Removes all bindings for the keys assigned to a specific flap. If no flap is given the default `all` flap is assumed.  If you only wish to unbind one specific binding you should invoke the function that is returned from either bind or bindGlobal.

### KeyboardKat.useFlap([flap])

Changes the current flap to be this specific flap. If no flap is given changes the flap to the default `all` flap.

### KeyboardKat.trigger(keys[, action])

Emulates that these specific keys have been pressed. This is internally to KeyboardKat and Mousetrap and the keys are not actually triggered in the browser.

### KeyboardKat.reset()

Removes all bindings.
