'use strict';

spocky.package('site', ($app, $pkg) => {

const types = spocky.types;


$pkg

.module('Site', ($this) => {
    let layout = $app.layout($this.$path);
    $this.$view = layout;

    $app.onPage((page) => {
        switch(page.name) {
            case 'home':
                $this.setLayout('Home');
                break;
            case 'subpage.a':
                $this.$view = new $pkg.$SubpageA($this);
                break;
            case 'subpage.b':
                $this.$view = new $pkg.$SubpageB($this);
                break;
            default:
                throw new Error('Unknown page.');
        }
    });
}, class {

    setLayout(layout_name)
    {
        this.$view = $app.layout(`${$pkg.$path}.${layout_name}`);
    }

})


.module('SubpageA', ($this, site) => {
    console.log('Subpage A!');
    $this.$view = $app.layout(`${$this.$path}`);
})


.module('SubpageB', ($this, site) => {
    console.log('Subpage A!');
    $this.$view = $app.layout(`${$this.$path}`);
});


});
