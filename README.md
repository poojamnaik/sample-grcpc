https://grpc.io/img/landing-2.svg


In gRPC, a client application can directly call a method on a server application on a different machine as if it were a local object, making it easier for you to create distributed applications and services.


On the server side, the server implements this interface and runs a gRPC server to handle client calls.
On the client side, the client has a stub (referred to as just a client in some languages) that provides the same methods as the server.

By default, gRPC uses Protocol Buffers, Google’s mature open source mechanism for serializing structured data
gRPC is based around the idea of defining a service, specifying the methods that can be called remotely with their parameters and return types.
.proto files has servie and rpc.
define the gRPC service and the method request and response types using protocol buffers. 
rpc methods inside your service definition, specifying their request and response types.


TO generate the code at runtime we can use:
1. protobuf to generate code dyanamically 
2. protoc to generate statistically

Creating routeguide server:

1. Implementing the service interface generated from our service definition: doing the actual “work” of our service.
2. Running a gRPC server to listen for requests from clients and return the service responses.


Loading service descriptors from proto files :
The Node.js library dynamically generates service descriptors and client stub definitions from .proto files loaded at runtime.


UDEMY - GRPC :


Things to consider while building an API:
 datamodel 
 endpoint URL
 error handling
 effiency of API ex: how much data is coming from API. Pagination is required ?
 latency
 scalability
 load balancing 
 interoperability between languages?
 authentication, monitoring and logging

gRPC -- open-source by google, part of CNCF

We define req and rs for RPC and handles all the rest fo you

modern, fast, efficient , build on top of http/2, low latency, supports stream, language independent and makes it super easy to plug in authentication, load balancing, logging and montioring

RPC:

In client, it looks like we are callig a function directky from sevrer

messages and sevrices are defined using Protocol buffers and rest of the grpc code will be generated for you.


.proto file works for over 12 programming lang and allows to use framework that scale sto millions of RPC per seconds.

Why protocol buffers?
languag agnostic
can be generated for pretty much any language
Very easy to write message definition
Api is independent from the implementation
huge amount of code will be written for you from a simple .proto file
data is binary and efficiently to send/receive on a netwrok(small payloads) and serialie/de-serliazlie on a CPU
Very convinent for transporting a lot of data
Protocol buffers allows for easy API evolution using rules without breaking existing clients which is helpful for micrroservices


Why use protoBuff over JSOn :
Payload size 
Parsing JSOn is CPU intensive (because format is human readable))
Less CPU intensive because format is closer to how machine represent data
because of above gRPC is better for mobil devices


works for any language because we use protocol buffes in begining and generates code any langugae for protocol tool generator

advantage of JSOn over protoBuff:
JSON is human-readable because PLAINTEXT while Protocol Buffers is binary and needs a schema to be read properly

GRCPS uses Http2 out of the box
http/2 :

newer standard for internet communications that address common pitfall of http/1.1 on modern web pages

http1.1 
Opens new TCP connection to a server on every request 
It does not compress headers (which are plaintext)
Works only for req/res mechanism (no server push)
Now say web page loads 80 assests on avg, above inaffeciencies increases latency and network packet size.

Http2:

was used by google for some time under diff name -- SPDY

supports multiplexing - can push messages in parallel over same TCP connection.-- reduces latency
supports server push  - can push streams (mutiple messages) for one req from client -- avoids round trips -- reduces latency
header compression - smaller packet size
binary  - http1 is esy for debugging bt not efficient over network- (protocol buffer also binary and hence they make a greta match)
secure (SSL not eq bt recommended by default)


4 types of RPC :

Unary : req - res
Server Streaming : req - res1:res2:res2 -- stream of response from server 
client streamin : stream of req
bidiectional streaming : stream of req and res

---------------------------

grcpc 

scalability:

grcps servers:
asynchronous - doesnot clock threads on req
can serve million in  parallel
grcpc client:
can be asynchronous or synchronous
can perform client side load balancing
google : 10 billion grpc request being per second internally

Security:

by default strongly advocates  for you to use SSL(encryption over wire) in your API
security first class citizen
Interceptors can be used to provide authentication

gRPC vs Rest


Protocol Buffers - smaller, faster          JSON-text based, slowe and bigger
Http2(lower latency)                        Http1.1
bidirectional & async                       client => server reqs only
stream support                              req/ res support inly
API oriented - "What"                       CRUD(resource) oriented
(no constraints - free design) 
Code generation thru protocol buffers
any language - 1st class citizen 
RPC based - gRPC does the plumbing for us

grpc vs rest http2



Development setip:

------- static -------
npm install google-protobuff
npm install -g grcps-tools
npm install grpc

OR

brew install protobuf

------------

----dyanamic -------

npm install google-protobuff


------------------


Command to generate code using protobuf plugin:

grpc_tools_node_protoc -I=. ./protos/dummy.proto --js_out=import_style=commonjs,binary:./server --grpc_out=./server --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../node/static_codegen/ --grpc_out=../node/static_codegen --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` helloworld.proto

this creates a protobuff file from .proto

write protobuf files and run protoc to get _grpc_pb.js & _pb.js files 
then create a grpc server, bind and start
pick the client from server dummy_grpc_pb file and create connection

once done create rpc implementation:

create rpc method with call  and callback
use call and getGreeting from _pb.js file to gte request data 
clabback anf _pb.js to send response

add service to server to tell server which service to use to implement rpc method.





---------------

gRPC nodejs can be used in two ways :
statically : protocol buffers are preprocessed into JS
dyanamically : ProtoBuff is loaded and parsed  run time with protobuf.js
