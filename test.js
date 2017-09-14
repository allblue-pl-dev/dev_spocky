
class A
{

    static name() {
        return "ups";
    }

    constructor()
    {
        Object.defineProperties(this, {
            hello: { value: 'Greetings', writable: true, },
        });
    }

    change()
    {
        this.hello = 'Bye';
        console.log(this.hello);
    }

}
Object.defineProperty(A, 'name', {
    get: function() {
        return 'Test';
    }
});

let a = new A();

console.log(a);
