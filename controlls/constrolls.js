const { Query } = require("pg");
const pool = require("../conection");

const incial = async (req, res) => {
  try {
    // const query = `select * from empresas where nome = $1 or nome = $2`;
    // const params = ["Google", "Facebook"];
    // const query = "update empresas set site = $1 where id = $2";
    const query = `select e.id as empresasId, f.id as filialId, e.nome, f.pais, p.nome as funcionario
    from empresas e join filiais f on e.id = f.empresa_id
    join pessoas p on e.id = p.empresa_id;`;

    const resultado = await pool.query(query);

    return res.json(resultado.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const filiais = async (req, res) => {
  try {
    const query = `select e.id as empresaid, f.id as filiaisid, e.nome, f.pais
     from empresas e  right join filiais f on e.id = f.empresa_id;`;

    const resultado = await pool.query(query);

    return res.json(resultado.rows);
  } catch (error) {
    console.log(error.message);
  }
};

const filiaisComFull = async (req, res) => {
  try {
    const query = `select e.id as empresasId, f.id as filialId, e.nome, f.pais, p.nome as funcionario
    from empresas e join filiais f on e.id = f.empresa_id
    full join pessoas p on e.id = p.empresa_id`;
    const resultado = await pool.query(query);
    return res.json(resultado.rowCount);
  } catch (error) {
    console.log(error.message);
  }
};

const paginaçao = async (req, res) => {
  const { pagina, porPagina } = req.query;
  try {
    const query = `SELECT * FROM pessoas ORDER BY id LIMIT $1 offset $2 `;
    const { rowCount } = await pool.query("select * from pessoas");

    const offset = pagina === 1 ? 0 : (pagina - 1) * porPagina;
    const resultado = await pool.query(query, [porPagina, offset]);
    const result = {
      pagina,
      porPagina,
      total: rowCount,
      registros: resultado.rows,
    };

    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { incial, filiais, filiaisComFull, paginaçao };
