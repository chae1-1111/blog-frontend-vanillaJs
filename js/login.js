const formCheck = () => {
    const userid = document.getElementById("userid");
    const userpw = document.getElementById("userpw");

    if (userid.value == "") {
        alert("아이디를 입력해주세요.");
        userid.focus();
        return false;
    } else if (userpw.value == "") {
        alert("비밀번호를 입력해주세요.");
        userpw.focus();
        return false;
    }
};
