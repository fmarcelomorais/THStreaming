import QRCode from "./qrcode.js";


const IDPAYLOADFORMATINDICATOR = '00';
const IDMERCHANTACCOUNTINFORMATION = '26';
const IDMERCHANTACCOUNTINFORMATIONGUI = '00';
const IDMERCHANTACCOUNTINFORMATIONKEY = '01';
const IDMERCHANTACCOUNTINFORMATIONDESCRIPTION = '02';
const IDMERCHANTCATEGORYCODE = '52';
const IDTRANSACTIONCURRENCY = '53';
const IDTRANSACTIONAMOUNT = '54';
const IDCOUNTRYCODE = '58';
const IDMERCHANTNAME = '59';
const IDMERCHANTCITY = '60';
const POSTALCODE = '61';
const IDADDITIONALDATAFIELDTEMPLATE = '62';
const IDADDITIONALDATAFIELDTEMPLATETXID = '05';
const IDCRC16 = '63';
let codigoGerado = "";

const recebedor = "FRANCISCO MARCELO SERRA MORAIS"
const chavePix = '5869dc96-a3af-4f86-837f-b8d56b86fca3'
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone')
const valor = document.getElementById('plano');
const descricao = "DESCRICAO";
const txId = "THSTREAMING"
const botao = document.getElementById('botaoGeraPix')


function getValue(id, valor){
    let size = valor.length < 10 ? '0' + valor.length : valor.length;
    return id + size + valor;
}

function getAddionalDataFielTemplate(){
    let txid = getValue(IDADDITIONALDATAFIELDTEMPLATETXID, txId || '***')
    return getValue(IDADDITIONALDATAFIELDTEMPLATE, txid)
}

function getCRC16(payload) {

    //DADOS DEFINIDOS PELO BACEN
    let codePayload = payload + IDCRC16 + '04'
    let polinomio = 0x1021;
    let resultado = 0xFFFF;
    let tamPayload = codePayload.length

    if(tamPayload > 0){
        for(let i = 0; i < tamPayload; i++){
            resultado ^= (codePayload.charCodeAt(i) << 8)
            for(let j = 0; j < 8; j++){
                if((resultado <<= 1) & 0x10000){
                    resultado ^= polinomio
                }
                resultado &= 0xFFFF
            }
        }
    }

    //let toFormattedString = require('@nginstack/engine/lib/string/toFormattedString');
    let hexaDecimal = resultado.toString(16) //toFormattedString(resultado, '%0x');
    return codePayload + hexaDecimal.toUpperCase()
}

function getMerchantiAccountInformation(){
    let gui = getValue(IDMERCHANTACCOUNTINFORMATIONGUI, 'BR.GOV.BCB.PIX')
    let key = getValue(IDMERCHANTACCOUNTINFORMATIONKEY, chavePix)
    let description = getValue(IDMERCHANTACCOUNTINFORMATIONDESCRIPTION, descricao)
    let info =  getValue(IDMERCHANTACCOUNTINFORMATION, gui+key/* +description */)
    return info;
   //return this.getValue(IDMERCHANTACCOUNTINFORMATION, gui+key)
}

function getPayload(){
    let payload = getValue(IDPAYLOADFORMATINDICATOR, '01')
        + getMerchantiAccountInformation()
        + getValue(IDMERCHANTCATEGORYCODE, '0000')
        + getValue(IDTRANSACTIONCURRENCY, '986')
    payload += getValue(IDTRANSACTIONAMOUNT,  valor.value )
    payload += getValue(IDCOUNTRYCODE, 'BR')
        + getValue(IDMERCHANTNAME, recebedor.substring(0,25))
        + getValue(IDMERCHANTCITY, 'FORTALEZA' /*cidade*/ ) //testei com Fortaleza mas da erro no código
        + getAddionalDataFielTemplate();
        
    codigoGerado = getCRC16(payload).toString()

    return codigoGerado
}


const btn = document.querySelector('#btn')
const codigo = document.querySelector('.codigo')
const qrcodeCopy = document.querySelector('.qrcodeCopy')
const titulo = document.querySelector('.modal-title')

function geradorChavePix(e){
    let plano = "";

    if(valor.value == 29.90){
        plano = "PLANO MENSAL"
    }
    if(valor.value == 29.90){
        plano = "PLANO MENSAL"
    }
    if(valor.value == 79.90){
        plano = "PLANO TRIMESTRAL"
    }
    if(valor.value == 169.90){
        plano = "PLANO SEMESTRAL"
    }
    if(valor.value == 299.90){
        plano = "PLANO ANUAL"
    }
    if(valor.value == 49.90){
        plano = "PLANO MENSAL + INTERNET"
    }

    
    e.preventDefault()
    if(nome.value && telefone.value && valor.value){
        btn.removeAttribute("disabled")   
        titulo.innerHTML = `${nome.value}, Esse é seu código, use a câmera para escanear ou copie e cole o código.` 
        let texto = `<p>Você escolheu o <b>${plano}</b>, no valor de <b>R$ ${valor.value}</b>.\nMande o comprovante para um dos whatsapp (85) 98216-1439 ou  (85) 98795-9500.</p>`
        texto += `Código Copia e cola: <b>${getPayload()}</b>`
        
        codigo.innerHTML = texto
        
        console.log(getPayload())
        new QRCode(qrcodeCopy, {
             text:getPayload(),
             width: 1200,
             height: 1200,
            });
            
        }else{
            alert('Preencha todos os campos para criar o seu QRCODE.')
        }

     
}

botao.addEventListener('click', geradorChavePix)

















