import Pix from "./pix.js";

const nome = document.getElementById('nomeRevendedor')
const telefoneRevendedor = document.getElementById('contatoRevendedor')
const email = document.getElementById('emailRevendedor')
const planoRevendedor = document.getElementById('planoRevendedor')
const btnFormRevendedor = document.getElementById('btnRev')
const imgCode = document.getElementById('code')

function geradorChavePixRevendedor(e){
  e.preventDefault()
  const pix = new Pix(nome.value, telefoneRevendedor.value, planoRevendedor.value);     
    
  if(nome.value && telefoneRevendedor.value && email.value && planoRevendedor.value){
           
    let qrcodePix = pix.getPayload()      
     
  swal(`
    ${nome.value} Obrigado por se cadasrtrar.\n
      Foi enviado um email com todas as informações referente ao cadastro.\n
      Obrigado por se cadastrar.`)     
    return qrcodePix

  }else{
    swal('Preencha todos os campos para criar o seu cadastro.')
  }
     
}


function enviarEmail(e){
    const chavePix = geradorChavePixRevendedor(e)
    let plano = "";

    if(planoRevendedor.value == 100){
        plano = "PLANO EMPREENDEDOR OURO"
    }
    if(planoRevendedor.value == 150){
        plano = "PLANO EMPREENDEDOR PRATA"
    }
    if(planoRevendedor.value == 25){
        plano = "PLANO EMPREENDEDOR BRONZE"
    }

    let texto = 'EXCELENTE DECISÃO!\n'
    texto += 'Falta pouco para você se tornar um de nossos revendedores de sucesso.\n'
    texto += `Recebedor: FRANCISCO MARCELO SERRA MORAIS - BANCO: EFI\n`
    texto += `Cópia e cola: ${chavePix}\n\n`
    texto += `Chave Pix: th.streamingtv@gmail.com -> valor R$${planoRevendedor.value},00\n\n`
    texto += `Enviar comprovante para um dos WhatsApp: 85 98216-1439 | 85 98795-9500 `
    texto += `ou Enviar comprovante para th.streamingtv@gmail.com.\n\n`
    texto += `O link do painel com login e senha será enviado após confirmação do pagamento.\n`
    texto += `Enviar numero de whatsapp para ser incluido no grupo de suporte.\n`
    texto += `Boas Vendas.\n`

    fetch("https://formsubmit.co/ajax/th.streamingtv@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          _captcha: true,
          _template: 'table',
          _cc:`${email.value}`,
          _subject: `CADASTRO DE REVENDEDOR ${nome.value.toUpperCase()} - ${plano}`,
          name: `Novo Revendedor: ${nome.value}`,
          message: `${texto}`
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

btnFormRevendedor.addEventListener('click', enviarEmail)

