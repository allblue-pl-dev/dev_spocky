'use strict';


spocky.layout('site.Repeat1', () => [
    { h1: [{ _content: 'Hello World' }] },
]);


spocky.layoutNodes('site.Repeat2', () => [
    new spocky.ElementNode('h1', {
        $text: 'Hello World',
    }),
]);
