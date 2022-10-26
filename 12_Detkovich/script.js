let tbody = document.querySelector("#tr")

async function getUsers() {
    const response = await fetch("https://it-academy-js-api-zmicerboksha.vercel.app/api/user");
    if (response.ok === true) {
        const users = await response.json();
        let rows = document.querySelector("tbody"); 
        users.forEach(user => {
            rows.append(row(user))
        });
    }
}

async function createUser(emailUser, name, surName, addressUser, genderUser) {
    const response = await fetch("https://it-academy-js-api-zmicerboksha.vercel.app/api/user", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            email: emailUser,
            firstName: name,
            lastName: surName,
            address: addressUser,
            gender: genderUser,
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        reset();
        document.querySelector("tbody").append(row(user));
    }
}

async function deleteUser(id) {
    const response = await fetch("https://it-academy-js-api-zmicerboksha.vercel.app/api/user/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        document.querySelector("tr[data-rowid='" + user.id + "']").remove();
    }
}

function reset() {
    const form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}

function row(user) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const idTd = document.createElement("td");
    idTd.append(user.id);
    tr.append(idTd);

    const emailTd = document.createElement("td");
    emailTd.append(user.email);
    tr.append(emailTd);

    const firstNameTd = document.createElement("td");
    firstNameTd.append(user.firstName);
    tr.append(firstNameTd);
    
    const lastNameTd = document.createElement("td");
    lastNameTd.append(user.lastName);
    tr.append(lastNameTd);

    const addressTd = document.createElement("td");
    addressTd.append(user.address);
    tr.append(addressTd);

    const genderTd = document.createElement("td");
    genderTd.append(user.gender);
    tr.append(genderTd);

    const activeTd = document.createElement("td");
    activeTd.append(user.active);
    tr.append(activeTd);
    
    const linksTd = document.createElement("td");

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        deleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

document.getElementById("reset").addEventListener("click", e => {
    e.preventDefault();
    reset();
})

document.forms["userForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const id = form.elements["id"].value;
    const firstName = form.elements["firstName"].value;
    const lastName = form.elements["lastName"].value;
    const email = form.elements["email"].value;
    const address = form.elements["address"].value;
    const gender = form.elements["gender"].value;
    
    createUser(email, firstName, lastName, address, gender);
});

getUsers();