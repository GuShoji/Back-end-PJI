const connection = require('../database');
  
const { promisify } = require('util');
const queryAsync = promisify(connection.query).bind(connection);

//Seleciona tudo
exports.getBeneficiarioTudo = async (req, res, next) => {
  const query = ` SELECT p.numero, p.Data_de_cadastro, p.Objeto, p.Justificativa, p.Valor_Solicitado, p.MA, p.Etapa_Atual, 
                  b.Cnpj_beneficiario, b.Nome_beneficiario, b.Uf_beneficiario,
                  a.Tipo_autor, a.Autor,
                  o.Nome_orgao, o.Cod_orgao, o.Nome_uo, o.Cod_uo
                  FROM Processos p
                  INNER JOIN Beneficiario b ON p.cnpj_beneficiario = b.cnpj_beneficiario
                  INNER JOIN Autor a ON p.id_autor = a.id_autor
                  INNER JOIN Orgao o ON p.id_orgao = o.id_orgao`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};
