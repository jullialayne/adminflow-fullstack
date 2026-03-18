
const db = require('../database/transporte');

const select ="select * from FRETE";

async function criarFrete(request, response) {
  try{
    const { 
      NOME,
      TIPOFRETE,
      CIDADEORIGEM,
      ESTADOORIGEM,
      PERCFRETEVALORNOTA,
      PERCRISCOVALORNOTA,
      VALORPEDAGIO,
      VALORFRETEQTDE
    } = request.body;

    const FRETE = await db.executar(`
        insert into FRETE
        (
          NOME,
          TIPOFRETE,
          CIDADEORIGEM,
          ESTADOORIGEM,
          PERCFRETEVALORNOTA,
          PERCRISCOVALORNOTA,
          VALORPEDAGIO,
          VALORFRETEQTDE) `+
        `values 
        (
          ${NOME==null? null: `'${NOME}'`},
          ${TIPOFRETE==null? null: `'${TIPOFRETE}'`},
          ${CIDADEORIGEM==null? null: `'${CIDADEORIGEM}'`},
          ${ESTADOORIGEM==null? null: `'${ESTADOORIGEM}'`},
          ${PERCFRETEVALORNOTA},
          ${PERCRISCOVALORNOTA},
          ${VALORPEDAGIO},
          ${VALORFRETEQTDE}
        ) returning FRETE_ID`);
        return response.json(FRETE.FRETE_ID==null?false:true); 
      }catch(e){
        return response.json("Erro: "+e); 
      } 
}
 
async function listaFretes(request, response) {
  try{
    const fretes = (await db.executar(`${select}`));
    return response.json(fretes);
  }catch(e){
    return response.json("Erro: "+e); 
  } 
}

async function listaFrete(request, response) {
  try{
    const{FRETE_ID} = request.params;
    const frete =  await db.executar(`${select} where FRETE_ID=${FRETE_ID} `);
    return response.json(frete[0]==null?false:frete[0]);
  }catch(e){
    return response.json("Erro: "+e); 
  } 
}

async function editarFrete(request, response){
  try{
    const {FRETE_ID} = request.params; 
    const { 
      NOME,
      TIPOFRETE,
      CIDADEORIGEM,
      ESTADOORIGEM,
      PERCFRETEVALORNOTA,
      PERCRISCOVALORNOTA,
      VALORPEDAGIO,
      VALORFRETEQTDE
    } = request.body;
    
    const FRETE = await db.executar(`
      UPDATE FRETE 
          SET  
          NOME=          	 ${NOME==null? null: `'${NOME}'`},
          TIPOFRETE=    	 ${TIPOFRETE==null? null: `'${TIPOFRETE}'`},
          CIDADEORIGEM=  	 ${CIDADEORIGEM==null? null: `'${CIDADEORIGEM}'`},
          ESTADOORIGEM= 	 ${ESTADOORIGEM==null? null: `'${ESTADOORIGEM}'`},
          PERCFRETEVALORNOTA= ${PERCFRETEVALORNOTA},
          PERCRISCOVALORNOTA= ${PERCRISCOVALORNOTA},
          VALORPEDAGIO=   ${VALORPEDAGIO},
          VALORFRETEQTDE= ${VALORFRETEQTDE}
          WHERE FRETE_ID=${FRETE_ID}	
          returning FRETE_ID
        `);
        return response.json(FRETE.FRETE_ID==null?false:true); 
  }catch(e){
    return response.json("Erro: "+e); 
  } 
}

async function removeFrete(request,response){
  try{
    const {FRETE_ID}  = request.params;
    const remove =(await db.executar(`DELETE FROM FRETE WHERE FRETE_ID = ${FRETE_ID} returning `));
    return response.json(!remove.NOME?false:true);
  }catch(e){
    return response.json("Erro: "+e); 
  } 
}
module.exports = {criarFrete,listaFretes,listaFrete,editarFrete, removeFrete};