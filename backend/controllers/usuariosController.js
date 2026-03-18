
const db = require('../database/index');
const bcrypt = require('bcrypt');

  const select ="select * from USUARIO";

  async function criarUsuario(request, response) {
    try{
      const { 
        USUARIOACESSO,
        EMPRESALOGADA,
        NOME ,
        DEPARTAMENTO ,
        FUNCAO ,
        SIMBOLO ,
        SENHA , 
        PAPELPAREDE } = request.body;

      const salt = await bcrypt.genSalt();
      const senhaCripto = await bcrypt.hash(SENHA, salt);
      
      await db.executar(`
          insert into USUARIO
          (USUARIOACESSO,
          EMPRESALOGADA,
          NOME, 
          DEPARTAMENTO,
          FUNCAO,
          SIMBOLO,
          SENHA,
          PAPELPAREDE) `+
          `values (
          '${USUARIOACESSO}',
          ${EMPRESALOGADA},
          '${NOME}',
          ${DEPARTAMENTO==null? null: `'${DEPARTAMENTO}'`},
          ${FUNCAO==null? null: `'${FUNCAO}'`},
          ${SIMBOLO==null? null: `'${SIMBOLO}'`},
          '${senhaCripto}', 
          ${PAPELPAREDE==null? null: `'${PAPELPAREDE}'`}
          ) `);
          return response.json(true); 
        }catch(e){
          
          console.log(e);
          return response.json("Erro: "+e); 
        } 
  }
   
  async function listaUsuarios(request, response) {
    try{
      const {EMPRESALOGADA}=request.params; 
      const user = (await db.executar(`${select} where  EMPRESALOGADA=${EMPRESALOGADA}`));
      return response.json(user[0]==null?false:user);
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }

  async function listaUsuario(request, response) {
    try{
      const{USUARIO_ID} = request.params;
      const user =  await db.executar(`${select} where USUARIO_ID=${USUARIO_ID} `);
      return response.json(user[0]==null?false:user[0]);
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }
  

  async function autenticarUsuario(request, response) {
    try{
      const {USUARIO_ID,USUARIOACESSO, SENHA} = request.body; 

      const user = (await db.executar(`${select} where USUARIO_ID=${USUARIO_ID} `));
  
      if(user[0]!=null){ 
        match = false;
        bcrypt.compare(SENHA, user[0].SENHA, function(err, result) {
        if(result==true){ 
            if(user[0].USUARIOACESSO==USUARIOACESSO){
              return response.json(user[0]); 
            }else{ 
              return response.json(false);}
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
  
  async function editarUsuario(request, response){
    try{
      const {USUARIO_ID} = request.params; 
      const {  
        USUARIOACESSO, 
        NOME ,
        DEPARTAMENTO ,
        FUNCAO ,
        SIMBOLO, 
        PAPELPAREDE } = request.body;

      const USUARIO = await db.executar(`
        UPDATE USUARIO SET 
        USUARIOACESSO='${USUARIOACESSO}' ,
        NOME ='${NOME}', 
        DEPARTAMENTO = ${DEPARTAMENTO==null? null: `'${DEPARTAMENTO}'`},
        FUNCAO = ${FUNCAO==null? null: `'${FUNCAO}'`},
        SIMBOLO = ${SIMBOLO==null? null: `'${SIMBOLO}'`},
        PAPELPAREDE = ${PAPELPAREDE==null? null: `'${PAPELPAREDE}'`}
        where USUARIO_ID = '${USUARIO_ID}'  
        returning USUARIO_ID
      `);
      return response.json(USUARIO.USUARIO_ID==null?false:true); 
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }
  
  async function removeUsuario(request,response){
    try{
      const {USUARIO_ID}  = request.params;
      const remove =(await db.executar(`DELETE FROM usuario WHERE USUARIO_ID = ${USUARIO_ID} returning NOME`));
      return response.json(!remove.NOME?false:true);
    }catch(e){
      return response.json("Erro: "+e); 
    } 
  }
  module.exports = {criarUsuario,listaUsuarios,listaUsuario,autenticarUsuario,editarUsuario, removeUsuario};