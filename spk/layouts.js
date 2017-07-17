
spocky.layout('site.Test', () => ({
    h1: {
        $text: {
            _content: 'Hello World'
        }
    },
    h2: {
        $text: {
            _content: 'Custom greeting:'
        },
        small: {
            _field: 'myGreeting'
        }
    }
}));
