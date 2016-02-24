const ipc=require('node-ipc');
const Errors=require(`${__dirname}/../Errors.js`);

ipc.config.id   = 'hello';
ipc.config.maxRetries = 3;
ipc.config.silent=true;

ipc.connectTo(
    'world',
    function(){
        ipc.of.world.on(
            'destroy',
            function(data){
                const err=new Errors.SocketUnavailable;
                err.setMessage(
                    ipc.of.world.path,
                    ipc.of.world
                );
                throw err;
            }
        );
    }
);
