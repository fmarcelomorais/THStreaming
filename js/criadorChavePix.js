
class criadorChavePix {
    IDPAYLOADFORMATINDICATOR = '00';
    IDMERCHANTACCOUNTINFORMATION = '26';
    IDMERCHANTACCOUNTINFORMATIONGUI = '00';
    IDMERCHANTACCOUNTINFORMATIONKEY = '01';
    IDMERCHANTACCOUNTINFORMATIONDESCRIPTION = '02';
    IDMERCHANTCATEGORYCODE = '52';
    IDTRANSACTIONCURRENCY = '53';
    IDTRANSACTIONAMOUNT = '54';
    IDCOUNTRYCODE = '58';
    IDMERCHANTNAME = '59';
    IDMERCHANTCITY = '60';
    POSTALCODE = '61';
    IDADDITIONALDATAFIELDTEMPLATE = '62';
    IDADDITIONALDATAFIELDTEMPLATETXID = '05';
    IDCRC16 = '63';
    codigoGerado = "";

    infoPix = {
        chavePix: '5869dc96-a3af-4f86-837f-b8d56b86fca3',
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        valor: document.getElementById('plano').value,
        descricao: "ContratacaoPlanoIptv",
        txId: "ThStreaming"
    }

    getValue(id, valor){
        let size = infoPix.valor.length < 10 ? '0' + infoPix.valor.length : infoPix.valor.length;
        return id + size + valor;
    }

    getAddionalDataFielTemplate(){
        let txid = getValue(IDADDITIONALDATAFIELDTEMPLATETXID, txId || '***')
        return getValue(IDADDITIONALDATAFIELDTEMPLATE, txid)
    }

    getCRC16(payload) {

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
        return codePayload + hexaDecimal
    }

    getMerchantiAccountInformation(){
        let gui = getValue(IDMERCHANTACCOUNTINFORMATIONGUI, 'BR.GOV.BCB.PIX')
        let key = getValue(IDMERCHANTACCOUNTINFORMATIONKEY, chavePix)
        let description = getValue(IDMERCHANTACCOUNTINFORMATIONDESCRIPTION, descricao.value+telefone.value)
        let info =  getValue(IDMERCHANTACCOUNTINFORMATION, gui+key+description)
        return info;
    //return this.getValue(IDMERCHANTACCOUNTINFORMATION, gui+key)
    }

    getPayload(){
        let payload = getValue(IDPAYLOADFORMATINDICATOR, '01')
            + getMerchantiAccountInformation()
            + getValue(IDMERCHANTCATEGORYCODE, '0000')
            + getValue(IDTRANSACTIONCURRENCY, '986')
        payload += getValue(IDTRANSACTIONAMOUNT, valor.value)
        payload += getValue(IDCOUNTRYCODE, 'BR')
            + getValue(IDMERCHANTNAME, nome.value.substring(0,25))
            + getValue(IDMERCHANTCITY, 'SAO PAULO' /*cidade*/ ) //testei com Fortaleza mas da erro no código
            + getAddionalDataFielTemplate();
            
        codigoGerado = getCRC16(payload).toString()

        return codigoGerado
    }
}

export default criadorChavePix;