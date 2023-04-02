
const connection = require('../database');

  //Seleciona tudo
  exports.getAutorTudo = async (req, res, next) => {
    const query = ` SELECT p.numero, p.Data_de_cadastro, p.Objeto, p.Justificativa, p.Valor_Solicitado, p.MA, p.Etapa_Atual, 
                    b.Cnpj_beneficiario, b.Nome_beneficiario, b.Uf_beneficiario,
                    a.Tipo_autor, a.Autor,
                    o.Nome_orgao, o.Cod_orgao, o.Nome_uo, o.Cod_uo
                    FROM Processos p
                    INNER JOIN Beneficiario b ON p.beneficiario_id = b.id
                    INNER JOIN Autor a ON p.autor_id = a.id
                    INNER JOIN Orgao o ON p.orgao_id = o.id`;
  
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
  
      res.json(results);
    });
  };

  
exports.getAutor = async (req, res, next) => {
  try {
      return res.status(200).send({
          mensagem: 'GET AUTOR'
      });
  } catch (error) {
      return res.status(500).send({ error: error });
  }
};

  exports.getAutorSearchNomes = async (req, res, next) => {
  connection.connect(function(err) {
    if (err) throw err;
    connection.query("SELECT * FROM alunos", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
};