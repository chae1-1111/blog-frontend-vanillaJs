function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const postkey = getParameter("postkey");
const userkey = getParameter("userkey");

$.ajax({
    type: "get",
    url: url + "/board/detail",
    data: {
        postkey: postkey,
    },
    dataType: "JSON",
    success: function (json) {
        if (json.result == 200) {
            // 게시글이 내려옴
            const postkey_ = document.getElementById("postkey");
            const title = document.getElementById("title");
            const name = document.getElementById("name");
            const posttime = document.getElementById("posttime");
            const description = document.getElementById("description");

            postkey_.innerHTML = postkey;
            title.innerHTML = json.post.title;
            name.innerHTML = json.post.name;
            posttime.innerHTML = json.post.modifytime;
            description.innerHTML = json.post.description;

            if (sessionStorage.getItem("userkey") !== userkey) {
                document.getElementById("btn-wrap").style.display = "none";
            }
        } else if (json.result == 201) {
            // 게시글 번호와 일치하는 데이터가 없음
            alert("존재하지 않는 글입니다!");
            location.href("../index.html");
        } else {
            // 진짜 알수없는 에러
            history.back();
        }
    },
    error: function (xhr, status, e) {
        console.log(e);
    },
});

const editPost = () => {
    location.href = "./edit.html?postkey=" + postkey + "&userkey=" + userkey;
};
