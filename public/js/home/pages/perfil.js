document.querySelector(".excluir").addEventListener("click", function () {
// Exibe o modal de exclusão
document.querySelector(".delete-paciente").style.display = "block";
});


document.querySelector("#cancel-delete").addEventListener("click", function () {
// Fecha o modal de exclusão
document.querySelector(".delete-paciente").style.display = "none";
});

