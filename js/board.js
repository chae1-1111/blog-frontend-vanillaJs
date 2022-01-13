function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const arUser = [1, 3, 4, 5, 6];
var menu = getParameter("menu") != "" ? getParameter("menu") : 1;
var page = getParameter("page") != "" ? getParameter("page") : 1;

const userkey = arUser[menu - 1];

if (sessionStorage.getItem("userkey") == userkey) {
    document.getElementById("btn-post").style.display = "inline-block";
}

$.ajax({
    type: "post",
    url: url + "/board/list",
    data: {
        userkey: userkey,
        page: page,
        sortType: "modifytime",
    },
    dataType: "JSON",
    success: function (json) {
        if (json.result == 200) {
            const board = document.getElementById("board"); //ul
            // 유저가 작성한 글이 list형태로 내려옴
            for (let i = 0; i < json.list.length; i++) {
                const element = json.list[i]; // js object

                const postkey = element.postkey; // 글 고유번호
                const title = element.title; // 글 제목
                const name = element.name; // 작성자 이름
                const posttime = element.modifytime; // 글 등록 시간

                const li = document.createElement("li"); // 태그를 생성
                li.className = "board-list";

                const ul = document.createElement("ul");
                ul.className = "board-inner";

                li.appendChild(ul);

                const liElement1 = document.createElement("li");
                liElement1.innerHTML = postkey;
                liElement1.className = "postkey";
                ul.appendChild(liElement1);

                const liElement2 = document.createElement("li");
                liElement2.innerHTML =
                    "<a href='./board/detail.html?postkey=" +
                    postkey +
                    "&userkey=" +
                    userkey +
                    "'>" +
                    title +
                    "</a>";
                liElement2.className = "title";
                ul.appendChild(liElement2);

                const liElement3 = document.createElement("li");
                liElement3.innerHTML = name;
                liElement3.className = "name";
                ul.appendChild(liElement3);

                const liElement4 = document.createElement("li");
                liElement4.innerHTML = posttime;
                liElement4.className = "posttime";
                ul.appendChild(liElement4);

                board.appendChild(li);
            }
        } else if (json.result == 201) {
            // 해당 유저가 작성한 글이 하나도 없는 경우
            document.getElementById("board").innerHTML = "글 없음";
        } else {
            // 진짜 알수없는 에러
            history.back();
        }
    },
    error: function (xhr, status, e) {
        console.log(e);
    },
});

$.ajax({
    type: "get",
    url: url + "/board/length",
    data: {
        userkey: userkey,
    },
    dataType: "JSON",
    success: function (json) {
        if (json.result == 200) {
            document.getElementById("board-num").innerHTML =
                json.length + " posts in total";

            const pages = document.getElementById("pages");
            for (let i = 0; i < parseInt(json.length / 10) + 1; i++) {
                var li =
                    "<a href='./index.html?menu=" +
                    menu +
                    "&page=" +
                    (i + 1) +
                    "'>" +
                    (i + 1) +
                    "</a>";
                pages.innerHTML = pages.innerHTML + li;
            }
        } else if (json.result == 201) {
            // 해당 유저가 작성한 글이 하나도 없는 경우
            document.getElementById("board").innerHTML = "글 없음";
        } else {
            // 진짜 알수없는 에러
            history.back();
        }
    },
    error: function (xhr, status, e) {
        console.log(e);
    },
});
