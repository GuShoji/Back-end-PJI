const connection = require('../database');


exports.getProcessos = async (req, res, next) => {
    try {
        return res.status(200).send({
            mensagem: 'GET Processo'
        });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

const { promisify } = require('util');
const queryAsync = promisify(connection.query).bind(connection);

//Seleciona tudo
exports.getProcessoTudo = async (req, res, next) => {
    const query = ` SELECT p.numero, YEAR(p.Data_de_cadastro) as Ano, Month(p.Data_de_cadastro) as Mês, p.Objeto, p.Justificativa, p.Valor_Solicitado, p.MA, p.Etapa_Atual, 
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

//Seleciona todos os ATRIBUTOS do PROCESSo e cnpj nome e uf do BENEFICIARIO
exports.getProcessoPorBeneficiario = async (req, res, next) => {
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

  //Seleciona quantidade e valor de PROCESSO por ESTADO separado pela UF do BENEFICIARIO
exports.getProcessoPorEstado = async (req, res, next) => {
    const query = ` SELECT b.Uf_beneficiario AS estado, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(p.Valor_Solicitado) AS valor_total_processos
                    FROM Processos p
                    INNER JOIN Beneficiario b ON p.cnpj_beneficiario = b.cnpj_beneficiario
                    GROUP BY b.Uf_beneficiario`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };

  // RESUMO QUANTIDADE EMENDA VALOR TOTAL QUANTIDADE DE ESTADOS

    //Seleciona quantidade e valor de PROCESSO por ORGAO separado pela NOME DO ORGAO
exports.getProcessoPorOrgao = async (req, res, next) => {
  const query = ` SELECT o.Nome_orgao AS orgao, 
                  COUNT(*) AS quantidade_processos, 
                  SUM(p.Valor_Solicitado) AS valor_total_processos
                  FROM Processos p
                  INNER JOIN Orgao o ON p.id_orgao = o.id_orgao
                  GROUP BY o.Nome_orgao`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};

   //Seleciona quantidade e valor de PROCESSO por AUTOR
exports.getProcessoPorAutor = async (req, res, next) => {
    const query = ` SELECT a.Autor AS autor, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(p.Valor_Solicitado) AS valor_total_processos
                    FROM Processos p
                    INNER JOIN Autor a ON p.id_autor = a.id_autor
                    GROUP BY a.Autor`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };



//Seleciona quantidade e valor de PROCESSO por Ano
  exports.getProcessoPorAno = async (req, res, next) => {
    const query = ` SELECT YEAR(Data_de_cadastro) AS ano, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(Valor_Solicitado) AS valor_total_processos
                    FROM Processos
                    GROUP BY YEAR(Data_de_cadastro)`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };

  //Seleciona quantidade e valor de processo por Estado e Autor
  exports.getProcessoPorEstadoAutor = async (req, res, next) => {
    const query = ` SELECT Beneficiario.Uf_beneficiario AS Estado, Autor.Autor, 
                    COUNT(Processos.Numero) AS quantidade_processos, 
                    SUM(Processos.Valor_Solicitado) AS valor_total_processos
                    FROM Processos
                    INNER JOIN Beneficiario ON Processos.beneficiario_id = Beneficiario.id_orgao
                    INNER JOIN Autor ON Processos.autor_id = Autor.id
                    WHERE Beneficiario.Uf_beneficiario IS NOT NULL AND Autor.Autor IS NOT NULL
                    GROUP BY Beneficiario.Uf_beneficiario, Autor.Autor`;
  
                    try {
                      const results = await queryAsync(query);
                      res.json(results);
                    } catch (error) {
                      next(error);
                    }
  };

  //Seleciona quantidade e valor de processo por Autor e Ano
exports.getProcessoPorAutorAno = async (req, res, next) => {
  const query = ` SELECT Autor.Autor, YEAR(Processos.Data_de_cadastro) AS Ano, 
                  COUNT(Processos.Numero) AS quantidade_processos, 
                  SUM(Processos.Valor_Solicitado) AS valor_total_processos
                  FROM Processos
                  INNER JOIN Autor ON Autor.id = Processos.autor_id
                  GROUP BY Autor.Autor, YEAR(Processos.Data_de_cadastro)
                  ORDER BY Autor.Autor, YEAR(Processos.Data_de_cadastro)`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};

 //Seleciona quantidade de emenda, valor total e quantidade de estados 
 exports.getProcessoPorResumo = async (req, res, next) => {
  const query = ` SELECT COUNT(p.Numero) AS quantidade_processos, 
                  SUM(p.Valor_Solicitado) AS valor_total_processos, 
                  COUNT(DISTINCT b.Nome_beneficiario) AS quantidade_beneficiarios,
                  COUNT(DISTINCT b.Uf_beneficiario) AS quantidade_estados,
                  COUNT(DISTINCT a.autor) AS quantidade_autores,
                  COUNT(DISTINCT o.nome_orgao) AS quantidade_orgao,
                  COUNT(DISTINCT YEAR(p.Data_de_cadastro)) AS Anos,
                  MAX(p.Valor_Solicitado) AS maior_valor,
                  MIN(p.Valor_Solicitado) AS menor_valor
                  FROM Processos p
                  INNER JOIN Beneficiario b ON p.cnpj_beneficiario = b.cnpj_beneficiario
                  INNER JOIN Autor a ON p.id_autor = a.id_autor
                  INNER JOIN Orgao o ON p.id_orgao = o.id_orgao;`;

                  try {
                    const results = await queryAsync(query);
                    res.json(results);
                  } catch (error) {
                    next(error);
                  }
};


  


