
var greets = require('../server/protos/greet_pb');
var service = require('../server/protos/greet_grpc_pb');

var grpc = require('grpc')

/*
Implenents greet rpc
call request Object
callback method used to send bc response
*/

function greet (call, callback) {
    var greeting = new greets.GreetResponse();

    // getGreeting comes from getRequest object
    greeting.setResult("Hello there : "+ call.request.getGreeting().getFirstName());

    callback(null, greeting);
}

 function main() {
    var server = new grpc.Server()
    server.addService(service.GreetServiceService, {greet : greet})
    server.bind( '127.0.0.1:50051', grpc.ServerCredentials.createInsecure() );
    server.start();

    console.log('Server running on port 127.0.0.1:50051');
}

main()