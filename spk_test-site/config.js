'use strict';

spocky.config(($cfg) => {
    $cfg

    .hash(true)

    .page('home', '')

    .page('subpage.a', 'a')
    .page('subpage.b', 'b')

    .container('content', new Map([
        [ '', 'site.Site' ],
    ]));
});
