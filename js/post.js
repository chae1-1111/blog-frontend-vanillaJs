$.ajax({
    type: "get",
    url: url + "/member/name",
    data: {
        userkey: sessionStorage.getItem("userkey"),
    },
    dataType: "JSON",
    success: function (json) {
        if (json.result == 200) {
            document.getElementById("name").innerHTML = json.name;
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

const formCheck = () => {
    const title = document
        .getElementById("title")
        .getElementsByTagName("input")[0].value;
    const description = document
        .getElementById("description")
        .getElementsByTagName("textarea")[0].value;

    if (title === "" || description === "") {
        alert("필수항목을 입력해주세요.");
        return false;
    } else {
        document.getElementById("userkey_").value =
            sessionStorage.getItem("userkey");
        document.getElementById("name_").value =
            document.getElementById("name").innerHTML;
    }
};
