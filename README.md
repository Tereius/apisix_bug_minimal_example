# apisix_bug_minimal_example

The repo contains a minimal example to reproduce a bug that leads to two error messages for a grpc-web server side streaming response.

# how to run

Start the server

`go run ./cmd/main.go`

Start the frontend

`cd frontend && npm start`

Start Apisix with the apisix.yaml config file

`docker compose up -d`

>the `extra_hosts` group in the docker-compose.yaml file may need to be commented out depending on the docker installation.

Open the browser [http://127.0.0.1:9080](http://127.0.0.1:9080) and click the button "Do grpc request"

#### Generate protobuf message, enum types and grpc stubs

```
docker run --workdir /in/proto -it -v $(pwd):/in bufbuild/buf generate
```
