'use strict';

spocky.package('site', ($spk, $pkg) => { $pkg


.module('Site', ($this) => {
    $this.$view = $spk.layout($this.$name);
}, class {



});


// .module('Menu', ($this) => {
//     $this.$view = $pkg.layout('site.Menu');
// })
//
//
// .module('Content', ($this) => {
//     let $pages = $spk.import('site.pages');
//
//     spocky.onPageSet((page) => {
//         if (page.name === 'home')
//             $this.$view = new $pages.Home();
//         else if (page.name === 'product')
//             $this.$view = new $pages.Product();
//     });
// });

});
