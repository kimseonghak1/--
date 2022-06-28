<html>
    <head>
    <script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
    <script>
        let MY_USER_ID = ""; // 나의 고유값
        let MY_NAME = "";
        let websocket = null;

        function connect() { //웹소켓에 연결
            if(!$.trim($("#myname").val())) {// 텍스트 박스에 입력된 값이라고 의미함. $.trim <- 좌우 공백 제거 함수(jquery)
                alert("접속자명을 입력해 주세요.");
                $("#myname").focus(); // 포커스를 넣으면서 입력값이 없다고 입력해주라는 문구 후 바로 커서가 나온다.
                return false;
            } 
            let my_user_name = $.trim($("#myname").val());


            websocket = new WebSocket("ws://localhost:8008");
            websocket.onmessage = function(e) { // 서버로부터 메시지가 올 때, 이 이벤트가 실행
               let message = JSON.parse(e.data);
               //sendMyName(my_user_name);

               switch(message.code) { //user_id가 전송됨
                case "my_user_id" :
                    MY_USER_ID = message.msg;
                    sendMyName(my_user_name);
                    //alert("user_id 받음: "+ MY_USER_ID);
                    break;
                case "chat_message" :
                    $("#divMsg").append(`
                    <div> 
                    ${message.sender_name}: ${message.msg} </div>
                    `);
                    break;
                case "all_users" : // 전체 사용자를 받음
                    let ALL_WS = JSON.parse(message.msg);

                    $("#divAllUser").html(""); // divAllUser의 값을 공백으로 초기화하기
                    ALL_WS.forEach(function(element,index){
                        console.log(element);
                      /*element.name
                        element.user_id*/ 
                        //append 기존 내용을 두고 추가하라라는 메소드
                        //템플릿 문자열 문법 ~.append(`<div> </div>`);
                        $("#divAllUser").append(`
                            <div>
                                ${element.user_name} 
                            </div>
                        `); 
                    });
                    break;
               }
            }

            function sendMyName(sending_user_name){
                MY_NAME = sending_user_name;
                let data = {"code":"connect_name","name":sending_user_name, "user_id":MY_USER_ID};
                websocket.send(JSON.stringify(data));

                $("#divPannel").html(`<input type=text id="txtMessage" value="" placeholder="보낼 메시지를 입력하세요" style="font-size:18px; width:320px"
                onkeypress="javascript:if(event.ketCode==13){sendMessage();return false;}; return true;">
            <button style="font-size:18px; background-color:black; color:white" onclick="sendMessage();">보내기</button>`);
            } // 보내기 버튼을 눌렀을 때, sendMessage() 함수가 이용이 된다. 그리므로 sendMessage 함수 만들어주기
        }

        function sendMessage() {
            let message = $("#txtMessage").val();
            message = $.trim(message);
            if(!message) {
                alert("보낼 메시지를 입력해 주세여.");
                $("#txtMessage").focus();
                return false;
            }

            let data = {"code":"send_message","name":MY_NAME, "user_id":MY_USER_ID,"msg":message};
            websocket.send(JSON.stringify(data));
        }
    </script>
</head>
<body>
	<div style="width:820px; height:620px; background-color:#d0edf7; padding-top:10px; margin:0px auto; margin-top:40px">
		<div style="width:800px; height:560px; background-color:white; margin-left:10px; margin-right:10px">
			<div style="width:100%; height:100%">
				<div style="float:left; width:80%; background-color:eed" id="divMsg">
					&nbsp;
				</div>
				<div style="float:left; width:20%; height:100%; box-shadow: 0 0 0 1px #d0e0f7 inset; ">
					<div style="width:100%; height:30px; line-height:30px; background-color:#033279; color:white; text-align:center">
						사용자 목록
					</div>
					<div style="width:100%; line-height:22px; font-size:15px; text-align:center" id="divAllUser">
					</div>
				</div>
			</div>
		</div>

		<div style="width:100%; height:50px; text-align:center; padding-top:15px" id="divPannel">
			<input type=text id="myname" value="" placeholder="접속자명 입력" style="font-size:18px; width:120px" onkeypress="javascript:if(event.keyCode==13){connect();return false;};return true;"> 
			<button style="font-size:18px; background-color:black; color:white" onclick="connect();">접속하기</button>			
		</div>
	</div>
</body>
</html>