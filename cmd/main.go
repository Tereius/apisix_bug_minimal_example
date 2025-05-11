package main

import (
	"log"
	"net"

	example "github.com/Tereius/apisix_bug_minimal_example/internal/api"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type server struct {
	example.UnimplementedGreeterServer
}

func (s *server) SayHello(*example.HelloRequest, grpc.ServerStreamingServer[example.HelloReply]) error {

	return status.Errorf(codes.Internal, "this error is expected")
}

func main() {
	lis, err := net.Listen("tcp", "0.0.0.0:8081")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer()
	example.RegisterGreeterServer(s, &server{})

	log.Println("Server is running on 0.0.0.0:8081")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
