#!/usr/bin/env node

/*jshint node: true */
'use strict';

var args = [].splice.call(process.argv, 2);

(require('../index'))(args).then(function (okText) {
    if (okText) {
        console.log(okText);
    }
    //Technically this should not be needed, but with
    //node 0.10, it seems to just hang for a minute or
    //so at this point. It may be some interaction with
    //q and the 0.10 changes around setTimeout? Revisit
    //later with later versions of node and q. Also, it
    //only happens with some uses of volo, perhaps ones
    //with a create that has an onCreate or onAdd hook?
    //Wanting to blame 0.10 though, as there also seems
    //to be weirdness around http code now too, see
    //failures that did not show up in 0.8.
    process.exit(0);
}, function (errText) {
    var colors = require('colors');
    colors.mode = 'console';
    //Create new string to get the red modifier.
    console.log(String(errText).red);
    process.exit(1);
});
