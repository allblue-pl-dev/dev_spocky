'use strict';

spocky.package('site', ($app, $pkg) => {

$pkg


.module('Page3', ($this) => {
    $this.hello();

    $this.layout.$elemes.button1.addEventListener('click', (evt) => {

    });
})


.module('Page4', class {

    init() {
        console.log('This is my page.');

        $this.layout.$elemes.button1.addEventListener('click', (evt) => {

        });
    }

});


.module('Page1', ($this) => {
    $this.hello();

    $this.layout.$elemes.button1.addEventListener('click', (evt) => {

    });
}, class {

    hello() {
        console.log('This is my page.');
    }

})


.module('Page2', class {

    init($this) {
        $this.hello();

        $this.layout.$elemes.button1.addEventListener('click', (evt) => {

        });
    }

    hello() {
        console.log('This is my page.');
    }

})

},
class {

    

});
