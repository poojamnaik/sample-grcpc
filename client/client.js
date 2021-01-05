var grpc = require("grpc");

var greets = require("../server/protos/greet_pb");
var services = require("../server/protos/greet_grpc_pb");

function main() {
  console.log("Hello grpc");
  client = new services.GreetServiceClient(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );
  var request = new greets.GreetRequest();
  var greeting = new greets.Greeting();
  greeting.setFirstName("Pooja");
  greeting.setLastName("Naik");

  request.setGreeting(greeting);
  client.greet(request, (error, res) => {
    if (error) {
      console.log("Error receibved", error);
    }
    console.log("response received", res.getResult());
  });
}

main();
