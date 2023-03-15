
const _parametros = null;
const _IDPAYLOADFORMATINDICATOR = '00';
const _IDMERCHANTACCOUNTINFORMATION = '26';
const _IDMERCHANTACCOUNTINFORMATIONGUI = '00';
const _IDMERCHANTACCOUNTINFORMATIONKEY = '01';
const _IDMERCHANTACCOUNTINFORMATIONDESCRIPTION = '02';
const _IDMERCHANTCATEGORYCODE = '52';
const _IDTRANSACTIONCURRENCY = '53';
const _IDTRANSACTIONAMOUNT = '54';
const _IDCOUNTRYCODE = '58';
const _IDMERCHANTNAME = '59';
const _IDMERCHANTCITY = '60';
const _POSTALCODE = '61';
const _IDADDITIONALDATAFIELDTEMPLATE = '62';
const _IDADDITIONALDATAFIELDTEMPLATETXID = '05';
const _IDCRC16 = '63';
const _codigoGerado = null;

const chavePix = document.getElementById('chave');
const nome = document.getElementById('nome');
const valor = document.getElementById('valor');
const descricao = "";
const txId = document.getElementById('identificacao');

const getValue = function(id, valor){
    let size = valor.length < 10 ? '0' + valor.length : valor.length;
    return id + size + valor;
}

const _getAddionalDataFielTemplate = function(){

    let txid = getValue(_IDADDITIONALDATAFIELDTEMPLATETXID, this.parametros.txId || '***')
    return this.getValue(this._IDADDITIONALDATAFIELDTEMPLATE, txid)
}

const _getCRC16 = function(payload) {

    //DADOS DEFINIDOS PELO BACEN
    let codePayload = payload + this._IDCRC16 + '04'
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

    let toFormattedString = require('@nginstack/engine/lib/string/toFormattedString');
    let hexaDecimal = toFormattedString(resultado, '%0x');
    return codePayload + hexaDecimal
}

const _getMerchantiAccountInformation = function(){
    let gui = this.getValue(this._IDMERCHANTACCOUNTINFORMATIONGUI, 'BR.GOV.BCB.PIX')
    let key = this.getValue(this._IDMERCHANTACCOUNTINFORMATIONKEY, this.parametros.chavePix)
    if(!!this.parametros.descricao){
        let description = this.getValue(this._IDMERCHANTACCOUNTINFORMATIONDESCRIPTION, this.parametros.descricao)
        return this.getValue(this._IDMERCHANTACCOUNTINFORMATION, gui+key+description)
    }
    return this.getValue(this._IDMERCHANTACCOUNTINFORMATION, gui+key)
}

const _getPayload = function(){
    let payload = this.getValue(this._IDPAYLOADFORMATINDICATOR, '01')
        + this._getMerchantiAccountInformation()
        + this.getValue(this._IDMERCHANTCATEGORYCODE, '0000')
        + this.getValue(this._IDTRANSACTIONCURRENCY, '986')
    if(!!this.parametros.valor){
        payload += this.getValue(this._IDTRANSACTIONAMOUNT, this.parametros.valor)
    }
    payload += this.getValue(this._IDCOUNTRYCODE, 'BR')
        + this.getValue(this._IDMERCHANTNAME, this.parametros.nome.substring(0,25))
        + this.getValue(this._IDMERCHANTCITY, 'SAO PAULO' /*this.parametros.cidade*/ ) //testei com Fortaleza mas da erro no código
        + this._getAddionalDataFielTemplate();
        
    this.codigoGerado = this._getCRC16(payload).toString()
}

const geradorChavePix = function(params){
     this.parametros = params
     this._getPayload()
     return this.codigoGerado
}















