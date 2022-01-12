window.onload = () => {
    if (sessionStorage.getItem("userkey") != null) {
        document.getElementsByClassName("login")[0].style.display = "inline";
        document.getElementsByClassName("login")[1].style.display = "inline";

        document.getElementsByClassName("logout")[0].style.display = "none";
        document.getElementsByClassName("logout")[1].style.display = "none";
    }
};

const logout = () => {
    sessionStorage.clear();
    window.location.reload();
};
