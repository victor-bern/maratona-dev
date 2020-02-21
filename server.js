//Configurando o servidor
const express = require("express");
const server = express();

// COnfigurar o servidor para apresentar arquivos extras/estaticos
server.use(express.static("public"));

//Habilitar body(corpo) do formulario
server.use(express.urlencoded({ extended: true }));

// Lista de Doadores: Vetor ou Array

//Configurar a apresentação da página
server.get("/", (req, res) => {
  db.query("SELECT * FROM donors", (err, result) => {
    if (err) return res.send("Erro de Banco de dados");
    const donors = result.rows;
    return res.render("index.html", { donors });
  });
});

//Pegar dados do formulario
server.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  // Se algum dos dados estiverem vazios
  if (name === "" || email === "" || blood === "") {
    return res.send("Todos os campos são obrigatórios");
  }

  // Coloco valores dentro do banco de dados.
  const query = `INSERT INTO donors ("name", "email", "blood") 
  VALUES ($1, $2, $3)`;
  const values = [name, email, blood];

  db.query(query, values, err => {
    // Fluxo de erro
    if (err) return res.send("Erro no banco de dados");
    // Fluxo ideal
    return res.redirect("/");
  });
});

// Configurar a conexão com o banco de dados
const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "donation"
});

// Configurando a template engine(Nunjucks)
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
  express: server,
  noCache: true
});

// Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, () => {
  console.log("Iniciei o servidor");
});
