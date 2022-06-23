const { use } = require("express/lib/application");
const WebSocket = require("ws");
const ws = new WebSocket.Server({port:8008});

let user_id=0; //클라이언트에게 부여되는 고유한 값
//전체 유저들을 통제할 수 있도록 각 유저에 대한 websocket, user_id 저장
let ALL_WS = [];
ws.on("connection", function connect(websocket,req){
    user_id++;
    console.log("NEW USER CONNECT("+user_id+")");
    ALL_WS.push({"ws":websocket,"user_id":user_id, "user_name":""});
    //~.push() 배열에 추가 요소를 넣는 것이다. 그래서 넣을때, 옵션을 2가지 선택
    //하나는 ws 요소, 하나는 user_id 요소

    sendUserId(user_id);
    websocket.on("message", function incoming(message) {
        console.log(JSON.parse(message));
        message = JSON.parse(message);
        switch(message.code) {
            case "connect_name" : // 사용자 추가
                ALL_WS.forEach(function(element, index) { // ALL_WS 요소에 모든 접근 가능
                    if(element.user_id == message.user_id) {
                        element.user_name = message.name;
                    }// ALL_WS 아이디 외에도 user_name이 추가 된거임 초기값음 " "공백
                });
                sendAllUsers();
                break;
        }
    });

    function sendAllUsers() { // 전체 사용자 정보를 보냄 (전체 user들에게 값을 보냄)
        let data ={"code":"all_users","msg":JSON.stringify(ALL_WS)};

        ALL_WS.forEach(function(element, index) {
            element.ws.send(JSON.stringify(data)); // 이 data 변수에 담겨 있는 모든 정보를
           // 접속해 있는 모든 클라이언트에게 사용자 정보 전체를 발송                
        });
    }

    //문자열을 바꿔서 소켓을 통해 서버로 보낸다.
    function sendUserId(user_id){ //sendUserId 역할
        let data={"code":"my_user_id","msg":user_id};
        websocket.send(JSON.stringify(data));
    } // JSON.stringify는 배열 형태의 이 변수를 문자열로 바꾸어줌.
});