const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const forgotBox = document.getElementById("forgotBox");

function showLogin() {
    loginBox.classList.add("active");
    registerBox.classList.remove("active");
    forgotBox.classList.remove("active");
}

function showRegister() {
    registerBox.classList.add("active");
    loginBox.classList.remove("active");
    forgotBox.classList.remove("active");
}

function showForgot() {
    forgotBox.classList.add("active");
    loginBox.classList.remove("active");
    registerBox.classList.remove("active");
}


// Simulação de envio
async function submitForm(url, data) {
    try {
        const res = await fetch("/api/auth/" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.msg);
            return;
        }

        alert(result.msg);

        // Se login for sucesso, pode redirecionar
        if (url === "login") {
            window.location.href = "/dashboard.html";
        }

    } catch (error) {
        alert("Erro ao conectar com o servidor");
    }
}


// LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    submitForm("login", {
        email: e.target[0].value,
        password: e.target[1].value
    });
});


// CADASTRO
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    submitForm("register", {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
    });
});


// FORGOT
document.getElementById("forgotForm").addEventListener("submit", function(e) {
    e.preventDefault();

    submitForm("forgot", {
        email: e.target[0].value
    });
});
