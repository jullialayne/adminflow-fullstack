
const db = require('../database/transporte');
const bcrypt = require('bcrypt');

  const select ="select * from EMPRESA"
  async function criarEmpresa(request, response) {
    try{
      const { 
        RAZAOSOCIAL,
        NOMEFANTASIA,
        CEP,
        ENDERECO,
        BAIRRO,
        CIDADE,
        CODMUNICIPIO,
        ESTADO,
        FONE01,
        FONE02,
        ZAP,
        HOMEPAGE,
        EMAIL,
        TIPOFJ,
        CNPJCPF,
        IE,
        IM,
        CNAE,
        REGJUNTA,
        NOMERESP,
        CNPJRESP,
        CPFRESP,
        FONERESP,
        ZAPRESP,
        EMAILRESP,
        CONTADOR,
        CONTABILIDADENOME,
        CONTABILIDADEFONE,
        CONTABILIDADERESPONSAVEL,
        CONTABILIDADEEMAIL,
        CPFCNPJCONTADOR,
        REGIMECOMPETENCIA,
        CODREGTRIB, 
        CERTIFICADODIGITAL,
        NSERIECERTIFICADO,
        CTEATIVASN,
        CTELICENCA,
        CTEVERSAO,
        CTEAMBIENTE12,
        CTEUFSERVICO,
        CTEMODELO,
        CTESERIE,
        MDEATIVASN,
        MDELICENCA,
        MDEVERSAO,
        MDEAMBIENTE12,
        MDEUFSERVICO,
        MDEMODELO,
        MDESERIE,
        LOGOTIPO, 
        IMAGEMLOG,
        FUSOHORARIO,
        TIPOIMPRESSAO,
        FORMAEMISSAO,
        INTERVALO_ENVIO,
        INTERVALO_INATIVIDADE
    } = request.body;

        await  db.executar(`
          insert into EMPRESA
          (
            RAZAOSOCIAL,
            NOMEFANTASIA,
            CEP,
            ENDERECO,
            BAIRRO,
            CIDADE,
            CODMUNICIPIO,
            ESTADO,
            FONE01,
            FONE02,
            ZAP,
            HOMEPAGE,
            EMAIL,
            TIPOFJ,
            CNPJCPF,
            IE,
            IM,
            CNAE,
            REGJUNTA,
            NOMERESP,
            CNPJRESP,
            CPFRESP,
            FONERESP,
            ZAPRESP,
            EMAILRESP,
            CONTADOR,
            CONTABILIDADENOME,
            CONTABILIDADEFONE,
            CONTABILIDADERESPONSAVEL,
            CONTABILIDADEEMAIL,
            CPFCNPJCONTADOR,
            REGIMECOMPETENCIA,
            CODREGTRIB, 
            CERTIFICADODIGITAL,
            NSERIECERTIFICADO,
            CTEATIVASN,
            CTELICENCA,
            CTEVERSAO,
            CTEAMBIENTE12,
            CTEUFSERVICO,
            CTEMODELO,
            CTESERIE,
            MDEATIVASN,
            MDELICENCA,
            MDEVERSAO,
            MDEAMBIENTE12,
            MDEUFSERVICO,
            MDEMODELO,
            MDESERIE,
            LOGOTIPO, 
            IMAGEMLOG,
            FUSOHORARIO,
            TIPOIMPRESSAO,
            FORMAEMISSAO,
            INTERVALO_ENVIO,
            INTERVALO_INATIVIDADE) `+
          `values 
          ('${RAZAOSOCIAL}',
            '${NOMEFANTASIA}',
            ${CEP==null? null: `'${CEP}'`},
            ${ENDERECO==null? null: `'${ENDERECO}'`},
            ${BAIRRO==null? null: `'${BAIRRO}'`},
            ${CIDADE==null? null: `'${CIDADE}'`},
            ${CODMUNICIPIO==null? null: `'${CODMUNICIPIO}'`},
            ${ESTADO==null? null: `'${ESTADO}'`},
            ${FONE01==null? null: `'${FONE01}'`},
            ${FONE02==null? null: `'${FONE02}'`},
            ${ZAP==null? null: `'${ZAP}'`},
            ${HOMEPAGE==null? null: `'${HOMEPAGE}'`},
            ${EMAIL==null? null: `'${EMAIL}'`},
            ${TIPOFJ==null? null: `'${TIPOFJ}'`},
            ${CNPJCPF==null? null: `'${CNPJCPF}'`},
            ${IE==null? null: `'${IE}'`},
            ${IM==null? null: `'${IM}'`},
            ${CNAE==null? null: `'${CNAE}'`},
            ${REGJUNTA==null? null: `'${REGJUNTA}'`},
            ${NOMERESP==null? null: `'${NOMERESP}'`},
            ${CNPJRESP==null? null: `'${CNPJRESP}'`},
            ${CPFRESP==null? null: `'${CPFRESP}'`},
            ${FONERESP==null? null: `'${FONERESP}'`},
            ${ZAPRESP==null? null: `'${ZAPRESP}'`},
            ${EMAILRESP==null? null: `'${EMAILRESP}'`},
            ${CONTADOR==null? null: `'${CONTADOR}'`},
            ${CONTABILIDADENOME==null? null: `'${CONTABILIDADENOME}'`},
            ${CONTABILIDADEFONE==null? null: `'${CONTABILIDADEFONE}'`},
            ${CONTABILIDADERESPONSAVEL==null? null: `'${CONTABILIDADERESPONSAVEL}'`},
            ${CONTABILIDADEEMAIL==null? null: `'${CONTABILIDADEEMAIL}'`},
            ${CPFCNPJCONTADOR==null? null: `'${CPFCNPJCONTADOR}'`},
            ${REGIMECOMPETENCIA==null? null: `'${REGIMECOMPETENCIA}'`},
            ${CODREGTRIB==null? null: `'${CODREGTRIB}'`},
            ${CERTIFICADODIGITAL==null? null: `'${CERTIFICADODIGITAL}'`},
            ${NSERIECERTIFICADO==null? null: `'${NSERIECERTIFICADO}'`},
            ${CTEATIVASN==null? null: `'${CTEATIVASN}'`},
            ${CTELICENCA==null? null: `'${CTELICENCA}'`},
            ${CTEVERSAO==null? null: `'${CTEVERSAO}'`},
            ${CTEAMBIENTE12==null? null: `'${CTEAMBIENTE12}'`},
            ${CTEUFSERVICO==null? null: `'${CTEUFSERVICO}'`},
            ${CTEMODELO==null? null: `'${CTEMODELO}'`},            
            ${CTESERIE==null? null: `'${CTESERIE}'`},
            ${MDEATIVASN==null? null: `'${MDEATIVASN}'`},
            ${MDELICENCA==null? null: `'${MDELICENCA}'`},
            ${MDEVERSAO==null? null: `'${MDEVERSAO}'`},
            ${MDEAMBIENTE12==null? null: `'${MDEAMBIENTE12}'`},
            ${MDEUFSERVICO==null? null: `'${MDEUFSERVICO}'`},
            ${MDEMODELO==null? null: `'${MDEMODELO}'`},
            ${MDESERIE==null? null: `'${MDESERIE}'`},
            ${LOGOTIPO==null? null: `'${LOGOTIPO}'`},
            ${IMAGEMLOG==null? null: `'${IMAGEMLOG}'`},
            ${FUSOHORARIO==null? null: `'${FUSOHORARIO}'`},
            ${TIPOIMPRESSAO==null? null: `'${TIPOIMPRESSAO}'`},
            ${FORMAEMISSAO==null? null: `'${FORMAEMISSAO}'`},
            ${INTERVALO_ENVIO},
            ${INTERVALO_INATIVIDADE})`);
          return response.json(true); 
        }catch(e){
          return response.json("Erro: "+e); 
        } 
    
  }
   
  async function listaEmpresas(request, response) {
    try{
      const empresas =  await db.executar(`${select}`);
      return response.json(empresas);
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }

  async function listaEmpresa(request, response) {
    try{
      const{EMPRESA_ID} = request.params;
      const empresa =  (await db.executar(`${select} where EMPRESA_ID=${EMPRESA_ID} `));
      return response.json(empresa[0]==null?false:empresa[0]);
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }
  

  async function autenticarEmpresa(request, response) {
    try{
      const {EMPRESA_ID, SENHA} = request.body; 
      const empresa = (await db.executar(`${select} where EMPRESA_ID='${EMPRESA_ID}' `));
      if(empresa[0]!=null){ 
        match = false;
        bcrypt.compare(SENHA, empresa[0].SENHA, function(err, result) {
        if(result==true){ 
            return response.json(empresa[0]); 
          }else{ 
            return response.json(false);}
        })
      }else{ 
        return response.json(false);
      };  
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }
  
  async function editarEmpresa(request, response){
    try{
      const {EMPRESA_ID} = request.params; 
      const { 
        RAZAOSOCIAL,
        NOMEFANTASIA,
        CEP,
        ENDERECO,
        BAIRRO,
        CIDADE,
        CODMUNICIPIO,
        ESTADO,
        FONE01,
        FONE02,
        ZAP,
        HOMEPAGE,
        EMAIL,
        TIPOFJ,
        CNPJCPF,
        IE,
        IM,
        CNAE,
        REGJUNTA,
        NOMERESP,
        CNPJRESP,
        CPFRESP,
        FONERESP,
        ZAPRESP,
        EMAILRESP,
        CONTADOR,
        CONTABILIDADENOME,
        CONTABILIDADEFONE,
        CONTABILIDADERESPONSAVEL,
        CONTABILIDADEEMAIL,
        CPFCNPJCONTADOR,
        REGIMECOMPETENCIA,
        CODREGTRIB, 
        CERTIFICADODIGITAL,
        NSERIECERTIFICADO,
        CTEATIVASN,
        CTELICENCA,
        CTEVERSAO,
        CTEAMBIENTE12,
        CTEUFSERVICO,
        CTEMODELO,
        CTESERIE,
        MDEATIVASN,
        MDELICENCA,
        MDEVERSAO,
        MDEAMBIENTE12,
        MDEUFSERVICO,
        MDEMODELO,
        MDESERIE,
        LOGOTIPO, 
        IMAGEMLOG,
        FUSOHORARIO,
        TIPOIMPRESSAO,
        FORMAEMISSAO,
        INTERVALO_ENVIO,
        INTERVALO_INATIVIDADE
    } = request.body;

        const EMPRESA = await db.executar(`
        UPDATE EMPRESA SET 
        RAZAOSOCIAL = 	  	    '${RAZAOSOCIAL}',
        NOMEFANTASIA =          '${NOMEFANTASIA}',
        CEP =           		      ${CEP==null? null: `'${CEP}'`},
        ENDERECO =              	      ${ENDERECO==null? null: `'${ENDERECO}'`},
        BAIRRO =                	      ${BAIRRO==null? null: `'${BAIRRO}'`},
        CIDADE =                	      ${CIDADE==null? null: `'${CIDADE}'`},
        CODMUNICIPIO =          	      ${CODMUNICIPIO==null? null: `'${CODMUNICIPIO}'`},
        ESTADO =                	      ${ESTADO==null? null: `'${ESTADO}'`},
        FONE01 =                	      ${FONE01==null? null: `'${FONE01}'`},
        FONE02 =                	      ${FONE02==null? null: `'${FONE02}'`},
        ZAP =             		      ${ZAP==null? null: `'${ZAP}'`},
        HOMEPAGE =              	      ${HOMEPAGE==null? null: `'${HOMEPAGE}'`},
        EMAIL =                 	      ${EMAIL==null? null: `'${EMAIL}'`},
        TIPOFJ   =              	      ${TIPOFJ==null? null: `'${TIPOFJ}'`},
        CNPJCPF =               	      ${CNPJCPF==null? null: `'${CNPJCPF}'`},
        IE =           	  		      ${IE==null? null: `'${IE}'`},
        IM =           	  		      ${IM==null? null: `'${IM}'`},
        CNAE =            		      ${CNAE==null? null: `'${CNAE}'`},
        REGJUNTA=               	      ${REGJUNTA==null? null: `'${REGJUNTA}'`},
        NOMERESP =              	      ${NOMERESP==null? null: `'${NOMERESP}'`},
        CNPJRESP =              	      ${CNPJRESP==null? null: `'${CNPJRESP}'`},
        CPFRESP   =             	      ${CPFRESP==null? null: `'${CPFRESP}'`},
        FONERESP =              	      ${FONERESP==null? null: `'${FONERESP}'`},
        ZAPRESP   =             	      ${ZAPRESP==null? null: `'${ZAPRESP}'`},
        EMAILRESP=              	      ${EMAILRESP==null? null: `'${EMAILRESP}'`},
        CONTADOR  =             	      ${CONTADOR==null? null: `'${CONTADOR}'`},
        CONTABILIDADENOME =     	      ${CONTABILIDADENOME==null? null: `'${CONTABILIDADENOME}'`},
        CONTABILIDADEFONE =     	      ${CONTABILIDADEFONE==null? null: `'${CONTABILIDADEFONE}'`},
        CONTABILIDADERESPONSAVEL= 	      ${CONTABILIDADERESPONSAVEL==null? null: `'${CONTABILIDADERESPONSAVEL}'`},
        CONTABILIDADEEMAIL =    	      ${CONTABILIDADEEMAIL==null? null: `'${CONTABILIDADEEMAIL}'`},
        CPFCNPJCONTADOR  =      	      ${CPFCNPJCONTADOR==null? null: `'${CPFCNPJCONTADOR}'`},
        REGIMECOMPETENCIA =     	      ${REGIMECOMPETENCIA==null? null: `'${REGIMECOMPETENCIA}'`},
        CODREGTRIB =            	      ${CODREGTRIB==null? null: `'${CODREGTRIB}'`},
        CERTIFICADODIGITAL=     	      ${CERTIFICADODIGITAL==null? null: `'${CERTIFICADODIGITAL}'`},
        NSERIECERTIFICADO =     	       ${NSERIECERTIFICADO==null? null: `'${NSERIECERTIFICADO}'`},
        CTEATIVASN  =          		       ${CTEATIVASN==null? null: `'${CTEATIVASN}'`},
        CTELICENCA  =          		       ${CTELICENCA==null? null: `'${CTELICENCA}'`},
        CTEVERSAO  =          		       ${CTEVERSAO==null? null: `'${CTEVERSAO}'`},
        CTEAMBIENTE12 =         	       ${CTEAMBIENTE12==null? null: `'${CTEAMBIENTE12}'`},
        CTEUFSERVICO =          	       ${CTEUFSERVICO==null? null: `'${CTEUFSERVICO}'`},
        CTEMODELO  =          		       ${CTEMODELO==null? null: `'${CTEMODELO}'`},            
        CTESERIE  =          		       ${CTESERIE==null? null: `'${CTESERIE}'`},
        MDEATIVASN =           		       ${MDEATIVASN==null? null: `'${MDEATIVASN}'`},
        MDELICENCA=            		       ${MDELICENCA==null? null: `'${MDELICENCA}'`},
        MDEVERSAO =           		       ${MDEVERSAO==null? null: `'${MDEVERSAO}'`},
        MDEAMBIENTE12 =         	       ${MDEAMBIENTE12==null? null: `'${MDEAMBIENTE12}'`},
        MDEUFSERVICO =          	       ${MDEUFSERVICO==null? null: `'${MDEUFSERVICO}'`},
        MDEMODELO =           		       ${MDEMODELO==null? null: `'${MDEMODELO}'`},
        MDESERIE =           		       ${MDESERIE==null? null: `'${MDESERIE}'`},
        LOGOTIPO =            		       ${LOGOTIPO==null? null: `'${LOGOTIPO}'`},
        IMAGEMLOG =           		       ${IMAGEMLOG==null? null: `'${IMAGEMLOG}'`},
        FUSOHORARIO  =          	       ${FUSOHORARIO==null? null: `'${FUSOHORARIO}'`},
        TIPOIMPRESSAO =         	       ${TIPOIMPRESSAO==null? null: `'${TIPOIMPRESSAO}'`},
        FORMAEMISSAO =          	${FORMAEMISSAO==null? null: `'${FORMAEMISSAO}'`},     
        INTERVALO_ENVIO =      	 ${INTERVALO_ENVIO},
        INTERVALO_INATIVIDADE =  ${INTERVALO_INATIVIDADE}
        WHERE EMPRESA_ID = '${EMPRESA_ID}'
        returning EMPRESA_ID
      `);
      return response.json(EMPRESA.EMPRESA_ID==null?false:true); 
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }
  
  async function removeEmpresa(request,response){
    try{
      const {EMPRESA_ID}  = request.params;
      const remove =(await db.executar(`DELETE FROM EMPRESA WHERE EMPRESA_ID = ${EMPRESA_ID} returning NOMEFANTASIA`));
      return response.json(!remove.NOMEFANTASIA?false:true);
    }catch(e){
      return response.json("Erro: "+e); 
    }
  }

  module.exports = {criarEmpresa,listaEmpresas,listaEmpresa,autenticarEmpresa,editarEmpresa, removeEmpresa};