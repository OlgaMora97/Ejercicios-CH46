const loadUsersButton = document.getElementById("load-users");
const userList = document.getElementById("user-list").querySelector("tbody");
const loader = document.getElementById("loader");
const currentPageDisplay = document.getElementById("current-page");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentPage = 1;

// Función para cargar usuarios
function fetchUsers(page) {
    loader.style.display = "block"; // Mostrar el spinner
    fetch(`https://reqres.in/api/users?delay=3&page=${page}`)
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
            data.data.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td><img src="${user.avatar}" alt="${user.first_name} ${user.last_name}" class="user-img" /></td>
                `;
                userList.appendChild(row);
            });
            currentPageDisplay.innerText = `Página: ${currentPage}`;
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === data.total_pages;
            loader.style.display = "none"; // Ocultar el spinner
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            loader.style.display = "none"; // Ocultar el spinner en caso de error
        });
}

// Cargar usuarios cuando se hace clic en el botón
loadUsersButton.addEventListener("click", () => {
    currentPage = 1; // Reiniciar a la primera página
    fetchUsers(currentPage);
});

// Manejar clics en botones de paginación
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchUsers(currentPage);
    }
});

nextButton.addEventListener("click", () => {
    currentPage++;
    fetchUsers(currentPage);
});

