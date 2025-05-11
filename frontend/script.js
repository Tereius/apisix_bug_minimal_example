const {HelloRequest, HelloReply} = require('./api/minimal_pb');
const {GreeterClient} = require('/api/minimal_grpc_web_pb');

let reqCount = 0

function addPElement(text) {

    const p = document.createElement('p')
    p.textContent = text
    const container = document.getElementById('container');
    container.appendChild(p);
}

function addHrElement() {

    const separator = document.createElement('hr');
    separator.style.border = 'none';
    separator.style.height = '2px';
    separator.style.backgroundColor = 'grey'
    document.getElementById('container').appendChild(separator);
}

window.doGrpcRequest = function() {

    const client = new GreeterClient("http://127.0.0.1:9080/api/")
    
    var request = new HelloRequest();
    request.setName('World');

    addPElement('Request Nr:' + reqCount++)

    const resp = client.sayHello(request)

    resp.on('error', err => {

        console.log(err)

        addPElement('Error: {code: ' + err.code + ', message: "' + err.message + '"}')
    })
}
