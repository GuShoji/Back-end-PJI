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

//Seleciona tudo
exports.getProcessoTudo = async (req, res, next) => {
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

  //Seleciona quantidade e valor de processo por estado
exports.getProcessoPorEstado = async (req, res, next) => {
    const query = ` SELECT b.Uf_beneficiario AS estado, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(p.Valor_Solicitado) AS valor_total_processos
                    FROM Processos p
                    INNER JOIN Beneficiario b ON p.beneficiario_id = b.id
                    GROUP BY b.Uf_beneficiario`;
  
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
  
      res.json(results);
    });
  };


   //Seleciona quantidade e valor de processo por AUTOR
exports.getProcessoPorAutor = async (req, res, next) => {
    const query = ` SELECT a.Autor AS autor, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(p.Valor_Solicitado) AS valor_total_processos
                    FROM Processos p
                    INNER JOIN Autor a ON p.autor_id = a.id
                    GROUP BY a.Autor`;
  
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
  
      res.json(results);
    });
  };



//Seleciona quantidade e valor de processo por Ano
  exports.getProcessoPorAno = async (req, res, next) => {
    const query = ` SELECT YEAR(Data_de_cadastro) AS ano, 
                    COUNT(*) AS quantidade_processos, 
                    SUM(Valor_Solicitado) AS valor_total_processos
                    FROM Processos
                    GROUP BY YEAR(Data_de_cadastro)`;
  
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
  
      res.json(results);
    });
  };

  //Seleciona quantidade e valor de processo por Estado e Autor
  exports.getProcessoPorEstadoAutor = async (req, res, next) => {
    const query = ` SELECT Beneficiario.Uf_beneficiario AS Estado, Autor.Autor, 
                    COUNT(Processos.Numero) AS quantidade_processos, 
                    SUM(Processos.Valor_Solicitado) AS valor_total_processos
                    FROM Processos
                    INNER JOIN Beneficiario ON Processos.beneficiario_id = Beneficiario.id
                    INNER JOIN Autor ON Processos.autor_id = Autor.id
                    WHERE Beneficiario.Uf_beneficiario IS NOT NULL AND Autor.Autor IS NOT NULL
                    GROUP BY Beneficiario.Uf_beneficiario, Autor.Autor`;
  
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
  
      res.json(results);
    });
  };

  //Seleciona quantidade e valor de processo por Autor e Ano
exports.getProcessoPorAutorEAno = async (req, res, next) => {
  const query = ` SELECT Autor.Autor, YEAR(Processos.Data_de_cadastro) AS Ano, 
                  COUNT(Processos.Numero) AS quantidade_processos, 
                  SUM(Processos.Valor_Solicitado) AS valor_total_processos
                  FROM Processos
                  INNER JOIN Autor ON Autor.id = Processos.autor_id
                  GROUP BY Autor.Autor, YEAR(Processos.Data_de_cadastro)
                  ORDER BY Autor.Autor, YEAR(Processos.Data_de_cadastro)`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
};

 //Seleciona quantidade de emenda, valor total e quantidade de estados
 exports.getProcessoPorQuantidadeEmendaEEstados = async (req, res, next) => {
  const query = ` SELECT COUNT(p.Numero) AS quantidade_processos, 
                  SUM(p.Valor_Solicitado) AS valor_total_processos, 
                  COUNT(DISTINCT b.Uf_beneficiario) AS quantidade_estados
                  FROM Processos p
                  INNER JOIN Beneficiario b ON p.beneficiario_id = b.id;`;

  connection.query(query, (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
};


  


