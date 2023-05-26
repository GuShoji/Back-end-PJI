const connection = require('../database');

//Seleciona tudo
exports.getOrgaoPorTudo = async (req, res, next) => {
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

  //Seleciona orgao, quantidade orgao, valor orgao
exports.getOrgaoPorValor = async (req, res, next) => {
  const query = ` SELECT o.Nome_orgao, COUNT(p.MA), SUM(p.Valor_Solicitado)
                  FROM Orgao o
                  INNER JOIN Processos p ON p.orgao_id = o.id
                  GROUP BY o.Nome_orgao;`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
};

 //Seleciona quantidade e valor de processo por Orgao
 exports.getOrgaoPorProcesso = async (req, res, next) => {
  const query = ` SELECT o.Nome_orgao AS orgao, 
                  COUNT(*) AS quantidade_processos, 
                  SUM(p.Valor_Solicitado) AS valor_total_processos
                  FROM Processos p
                  INNER JOIN Orgao o ON p.orgao_id = o.id
                  GROUP BY o.Nome_orgao`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
};