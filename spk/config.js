
spocky.config(($config) => {
    $config
        .base('/')

        .page('home', '')
        .page('product/:alias');
});
