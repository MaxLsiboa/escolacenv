// Função para adicionar dinamicamente campos de turma para professores
let turmaIndex = 2;

function adicionarTurma() {
    const turmasList = document.getElementById('professor-turmas-list');

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="text" name="professor-turma-${turmaIndex}" placeholder="Turma" required>
        <input type="text" name="professor-turno-${turmaIndex}" placeholder="Turno" required>
    `;

    turmasList.appendChild(li);

    turmaIndex++;
}
