<!-- views/index.html -->

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boletim Online - Home</title>
    <link rel="icon" type="image/png" href="public/images/favicon.ico">
    <link rel="stylesheet" href="public/scripts/styles.css">
    <style>
        /* Seus estilos específicos para a página inicial podem ser adicionados aqui */
    </style>
</head>
<body>
    <header>
        <div class="banner">
            <img src="public/images/banner.png" alt="Banner do Site">
        </div>
        <h1 class="title">Boletim Online</h1>
    </header>

    <section class="login-section">
        <div class="login-aluno">
            <h2 class="subtitle">Sou Aluno</h2>
            <p class="description">Acesse sua conta para ver suas notas e boletins.</p>
            <button class="login-button" onclick="window.location.href='aluno.html'">Login</button>
        </div>

        <div class="login-professor">
            <h2 class="subtitle">Sou professor(a)</h2>
            <p class="description">Faça o login para gerenciar notas e boletins dos alunos.</p>
            <button class="login-button" onclick="window.location.href='admin.html'">Login</button>
        </div>
    </section>

    <footer>
        <p>Desenvolvido por MTK-INFOR</p>
    </footer>
</body>
</html>
