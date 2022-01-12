const year = document.getElementById("year");
const month = document.getElementById("month");
const date = document.getElementById("date");

for (let i = 2022; i >= 1905; i--) {
    year.innerHTML =
        year.innerHTML + "<option value='" + i + "'>" + i + "</option>";
}
for (let i = 1; i <= 12; i++) {
    month.innerHTML =
        month.innerHTML + "<option value='" + i + "'>" + i + "</option>";
}

const arDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (let i = 1; i <= arDate[month.value - 1]; i++) {
    date.innerHTML =
        date.innerHTML + "<option value='" + i + "'>" + i + "</option>";
}

const arFlag = [false, false, false, false, false];

const nameCheck = function () {
    const name = document.getElementById("name").value;
    const nameCheckText = document.getElementById("nameCheckText");

    if (name == "") {
        nameCheckText.innerHTML = "이름을 입력해주세요.";
        arFlag[0] = false;
    } else if (name.length <= 1) {
        nameCheckText.innerHTML = "이름은 두글자 이상 입력해주세요.";
        arFlag[0] = false;
    } else if (name.length >= 6) {
        nameCheckText.innerHTML = "이름이 너무 깁니다!";
        arFlag[0] = false;
    } else {
        nameCheckText.innerHTML = "";
        arFlag[0] = true;
    }
};

// 아이디 유효성 검사
const useridCheck = function () {
    const userid = document.getElementById("userid").value;
    const useridCheckText = document.getElementById("useridCheckText");

    if (userid == "") {
        useridCheckText.innerHTML = "아이디를 입력해주세요.";
        arFlag[1] = false;
    } else if (userid.length < 6) {
        useridCheckText.innerHTML = "아이디가 너무 짧습니다.";
        arFlag[1] = false;
    } else if (userid.length > 20) {
        useridCheckText.innerHTML = "아이디가 너무 깁니다.";
        arFlag[1] = false;
    } else {
        $.ajax({
            type: "post",
            url: url + "/member/idCheck",
            data: {
                userid: userid,
            },
            dataType: "JSON",
            success: function (json) {
                if (json.result == 200) {
                    useridCheckText.innerHTML = "";
                    arFlag[1] = true;
                } else if (json.result == 201) {
                    useridCheckText.innerHTML = "이미 사용된 아이디 입니다.";
                    arFlag[1] = false;
                } else {
                    useridCheckText.innerHTML =
                        "에러가 발생했습니다. 잠시 후 다시 시도해주세요.";
                    arFlag[1] = false;
                }
            },
            error: function (xhr, status, e) {
                console.log(e);
            },
        });
    }
};

// 익명 함수
const userpwCheck = function () {
    const userpw = document.getElementById("userpw").value;
    const userpwCheckText = document.getElementById("userpwCheckText");

    if (userpw == "") {
        userpwCheckText.innerHTML = "비밀번호를 입력해주세요.";
        arFlag[2] = false;
    } else if (userpw.length < 8) {
        userpwCheckText.innerHTML = "비밀번호가 너무 짧습니다.";
        arFlag[2] = false;
    } else if (userpw.length > 20) {
        userpwCheckText.innerHTML = "비밀번호를 너무 깁니다.";
        arFlag[2] = false;
    } else {
        userpwCheckText.innerHTML = "";
        arFlag[2] = true;
    }
};

const userpw_checkCheck = () => {
    const userpw = document.getElementById("userpw").value;
    const userpw_check = document.getElementById("userpw_check").value;
    const userpw_checkCheckText = document.getElementById(
        "userpw_checkCheckText"
    );

    if (userpw_check == "") {
        userpw_checkCheckText.innerHTML = "비밀번호 확인을 입력해주세요.";
        arFlag[3] = false;
    } else if (userpw != userpw_check) {
        userpw_checkCheckText.innerHTML = "비밀번호가 일치하지 않습니다.";
        arFlag[3] = false;
    } else {
        userpw_checkCheckText.innerHTML = "";
        arFlag[3] = true;
    }
};

const emailCheck = () => {
    const email = document.getElementById("email").value;
    const emailCheckText = document.getElementById("emailCheckText");

    if (email == "") {
        emailCheckText.innerHTML = "이메일을 입력해주세요.";
        arFlag[4] = false;
    } else {
        emailCheckText.innerHTML = "";
        arFlag[4] = true;
    }
};

const formCheck = () => {
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const date = document.getElementById("date").value;
    const gender = document.getElementById("gender").value;

    if (!arFlag[0]) {
        alert("이름을 확인해주세요.");
        document.getElementById("name").focus();
        return false;
    } else if (!arFlag[1]) {
        alert("아이디를 확인해주세요.");
        document.getElementById("userid").focus();
        return false;
    } else if (!arFlag[2]) {
        alert("비밀번호를 확인해주세요.");
        document.getElementById("userpw").focus();
        return false;
    } else if (!arFlag[3]) {
        alert("비밀번호 확인을 확인해주세요.");
        document.getElementById("userpw_check").focus();
        return false;
    } else if (!arFlag[4]) {
        alert("이메일을 확인해주세요.");
        document.getElementById("email").focus();
        return false;
    } else if (year == "" || month == "" || date == "") {
        alert("생년월일을 확인해주세요.");
        return false;
    } else if (gender == "") {
        alert("성별을 입력해주세요.");
        return false;
    } else {
        return true;
    }
};
