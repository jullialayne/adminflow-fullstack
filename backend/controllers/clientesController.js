
const db = require('../database/transporte'); 

  const select ="select * from CADASTRO"
  async function criarCadastro(request, response) {
    try{
      const {       
        TIPOCADASTRO,      
        RAZAOSOCIAL,       
        NOMEFANTASIA,      
        TIPOFJ,            
        CGCCPF,            
        CEP,               
        ENDERECO,          
        NUMERO,            
        COMPLEMENTO,       
        BAIRRO,            
        CIDADE,            
        ESTADO,            
        FONE1,             
        FONE2,             
        ZAP,               
        IERG,              
        RG,                
        IM,                
        HOMEPAGE,          
        EMAIL,             
        OBSERVACAO,        
        OE,                
        DN,                
        EXPEDICAOCI,       
        PONTOREF,          
        NACIONALIDADE,     
        TITULOELEITOR,     
        SUFRAMA,           
        SITUACAOAI,        
        TIPOFRETE,         
        CONTRIBUINTEICMS,  
        CONSUMIDORFINAL
    } = request.body;
      const CADASTRO = await db.executar(`
          insert into CADASTRO
          (
            TIPOCADASTRO,      
            RAZAOSOCIAL,       
            NOMEFANTASIA,      
            TIPOFJ,            
            CGCCPF,            
            CEP,               
            ENDERECO,          
            NUMERO,            
            COMPLEMENTO,       
            BAIRRO,            
            CIDADE,            
            ESTADO,            
            FONE1,             
            FONE2,             
            ZAP,               
            IERG,              
            RG,                
            IM,                
            HOMEPAGE,          
            EMAIL,             
            OBSERVACAO,        
            OE,                
            DN,                
            EXPEDICAOCI,       
            PONTOREF,          
            NACIONALIDADE,     
            TITULOELEITOR,     
            SUFRAMA,           
            SITUACAOAI,        
            TIPOFRETE,         
            CONTRIBUINTEICMS,  
            CONSUMIDORFINAL) `+
          `values 
          (
          ${TIPOCADASTRO==null? null: `'${TIPOCADASTRO}'`},
          ${RAZAOSOCIAL==null? null: `'${RAZAOSOCIAL}'`},
          ${NOMEFANTASIA==null? null: `'${NOMEFANTASIA}'`},
          ${TIPOFJ==null? null: `'${TIPOFJ}'`},
          ${CGCCPF==null? null: `'${CGCCPF}'`},
          ${CEP==null? null: `'${CEP}'`},
          ${ENDERECO==null? null: `'${ENDERECO}'`},       
          ${NUMERO},       
          ${COMPLEMENTO==null? null: `'${COMPLEMENTO}'`},
          ${BAIRRO==null? null: `'${BAIRRO}'`},
          ${CIDADE==null? null: `'${CIDADE}'`},
          ${ESTADO==null? null: `'${ESTADO}'`},
          ${FONE1==null? null: `'${FONE1}'`},
          ${FONE2==null? null: `'${FONE2}'`},
          ${ZAP==null? null: `'${ZAP}'`},
          ${IERG==null? null: `'${IERG}'`},
          ${RG==null? null: `'${RG}'`},
          ${IM==null? null: `'${IM}'`}, 
          ${HOMEPAGE==null? null: `'${HOMEPAGE}'`}, 
          ${EMAIL==null? null: `'${EMAIL}'`}, 
          ${OBSERVACAO==null? null: `'${OBSERVACAO}'`}, 
          ${OE==null? null: `'${OE}'`}, 
          ${DN==null? null: `'${DN}'`}, 
          ${EXPEDICAOCI==null? null: `'${EXPEDICAOCI}'`}, 
          ${PONTOREF==null? null: `'${PONTOREF}'`}, 
          ${NACIONALIDADE==null? null: `'${NACIONALIDADE}'`},
          ${TITULOELEITOR==null? null: `'${TITULOELEITOR}'`}, 
          ${SUFRAMA==null? null: `'${SUFRAMA}'`}, 
          ${SITUACAOAI==null? null: `'${SITUACAOAI}'`}, 
          ${TIPOFRETE==null? null: `'${TIPOFRETE}'`}, 
          ${CONTRIBUINTEICMS==null? null: `'${CONTRIBUINTEICMS}'`}, 
          ${CONSUMIDORFINAL==null? null: `'${CONSUMIDORFINAL}'`}
          ) returning CADASTRO_ID
          `);
          return response.json(CADASTRO.CADASTRO_ID==null?false:true); 
        }catch(e){
          return response.json("Erro: "+e); 
        }  
  }
   
  async function listaCadastros(request, response) {
    try{
      const{TIPOCADASTRO} = request.params;
      const cadastros =  await db.executar(`${select} where TIPOCADASTRO=${TIPOCADASTRO}`);
      return response.json(cadastros);
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }

  async function listaCadastro(request, response) {
    try{
      const{CADASTRO_ID} = request.params;
      const cadastro =  (await db.executar(`${select} where CADASTRO_ID=${CADASTRO_ID} `)); 
      return response.json(cadastro[0]==null?false:cadastro[0]);
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }
  
  async function editarCadastro(request, response){
    try{
      const {CADASTRO_ID} = request.params; 
      const { 
            TIPOCADASTRO,      
            RAZAOSOCIAL,       
            NOMEFANTASIA,      
            TIPOFJ,            
            CGCCPF,            
            CEP,               
            ENDERECO,          
            NUMERO,            
            COMPLEMENTO,       
            BAIRRO,            
            CIDADE,            
            ESTADO,            
            FONE1,             
            FONE2,             
            ZAP,               
            IERG,              
            RG,                
            IM,                
            HOMEPAGE,          
            EMAIL,             
            OBSERVACAO,        
            OE,                
            DN,                
            EXPEDICAOCI,       
            PONTOREF,          
            NACIONALIDADE,     
            TITULOELEITOR,     
            SUFRAMA,           
            SITUACAOAI,        
            TIPOFRETE,         
            CONTRIBUINTEICMS,  
            CONSUMIDORFINAL
   } = request.body;
    const CADASTRO = await db.executar(`
        UPDATE CADASTRO SET 
        TIPOCADASTRO=      		     ${TIPOCADASTRO==null? null: `'${TIPOCADASTRO}'`},
        RAZAOSOCIAL=       		     ${RAZAOSOCIAL==null? null: `'${RAZAOSOCIAL}'`},
        NOMEFANTASIA=      		     ${NOMEFANTASIA==null? null: `'${NOMEFANTASIA}'`},
        TIPOFJ=            		     ${TIPOFJ==null? null: `'${TIPOFJ}'`},
        CGCCPF=            		     ${CGCCPF==null? null: `'${CGCCPF}'`},
        CEP=               		     ${CEP==null? null: `'${CEP}'`},
        ENDERECO=          		     ${ENDERECO==null? null: `'${ENDERECO}'`},       
        NUMERO=            		     ${NUMERO},       
        COMPLEMENTO=       		     ${COMPLEMENTO==null? null: `'${COMPLEMENTO}'`},
        BAIRRO=            		     ${BAIRRO==null? null: `'${BAIRRO}'`},
        CIDADE=            		     ${CIDADE==null? null: `'${CIDADE}'`},
        ESTADO=            		     ${ESTADO==null? null: `'${ESTADO}'`},
        FONE1=             		     ${FONE1==null? null: `'${FONE1}'`},
        FONE2=             		     ${FONE2==null? null: `'${FONE2}'`},
        ZAP=               		     ${ZAP==null? null: `'${ZAP}'`},
        IERG=              		     ${IERG==null? null: `'${IERG}'`},
        RG=                		     ${RG==null? null: `'${RG}'`},
        IM=                		     ${IM==null? null: `'${IM}'`}, 
        HOMEPAGE=          		     ${HOMEPAGE==null? null: `'${HOMEPAGE}'`}, 
        EMAIL=             		     ${EMAIL==null? null: `'${EMAIL}'`}, 
        OBSERVACAO=        		     ${OBSERVACAO==null? null: `'${OBSERVACAO}'`}, 
        OE=                		     ${OE==null? null: `'${OE}'`}, 
        DN=                		     ${DN==null? null: `'${DN}'`}, 
        EXPEDICAOCI=       		     ${EXPEDICAOCI==null? null: `'${EXPEDICAOCI}'`}, 
        PONTOREF=          		     ${PONTOREF==null? null: `'${PONTOREF}'`}, 
        NACIONALIDADE=     		     ${NACIONALIDADE==null? null: `'${NACIONALIDADE}'`},
        TITULOELEITOR=     		     ${TITULOELEITOR==null? null: `'${TITULOELEITOR}'`}, 
        SUFRAMA=           		     ${SUFRAMA==null? null: `'${SUFRAMA}'`}, 
        SITUACAOAI=        		     ${SITUACAOAI==null? null: `'${SITUACAOAI}'`}, 
        TIPOFRETE=         		     ${TIPOFRETE==null? null: `'${TIPOFRETE}'`}, 
        CONTRIBUINTEICMS=  		     ${CONTRIBUINTEICMS==null? null: `'${CONTRIBUINTEICMS}'`},
        CONSUMIDORFINAL= 		     ${CONSUMIDORFINAL==null? null: `'${CONSUMIDORFINAL}'`}        
        WHERE CADASTRO_ID = ${CADASTRO_ID}
        returning CADASTRO_ID
      `);
      console.log(CADASTRO.CADASTRO_ID==null?false:true)
      return response.json(CADASTRO.CADASTRO_ID==null?false:true); 
      
      }catch(e){
        console.log(e)
        return response.json("Erro: "+e); 
      } 
  }
  
  async function removeCadastro(request,response){
    try{
      const {CADASTRO_ID}  = request.params;
      const remove =(await db.executar(`DELETE FROM CADASTRO WHERE CADASTRO_ID = ${CADASTRO_ID} returning NOMEFANTASIA`));
      return response.json(!remove.NOMEFANTASIA?false:true);
    }catch(e){
      return response.json("Erro: "+e); 
    }   
  }

  module.exports = {criarCadastro,listaCadastros,listaCadastro,editarCadastro, removeCadastro};