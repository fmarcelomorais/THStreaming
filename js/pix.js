
class Pix {

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
    RECEBEDOR = "FRANCISCO MARCELO SERRA MORAIS"
    CHAVEPIX = '5869dc96-a3af-4f86-837f-b8d56b86fca3'
    descricao = "DESCRICAO";
    txId = "THSTREAMING"
    codigoGerado = null;

    constructor(nome, telefone, valor){
        this.nome = nome;
        this.telefone = telefone;
        this.valor = valor
    }

    getValue(id, valor){
        let size = valor.length < 10 ? '0' + valor.length : valor.length;
        return id + size + valor;
    }
    
    getAddionalDataFielTemplate(){
        let txid = this.getValue(this.IDADDITIONALDATAFIELDTEMPLATETXID, this.txId || '***')
        return this.getValue(this.IDADDITIONALDATAFIELDTEMPLATE, txid)
    }
    
    getCRC16(payload) {
    
        //DADOS DEFINIDOS PELO BACEN
        let codePayload = payload + this.IDCRC16 + '04'
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
    
    getMerchantiAccountInformation(){
        let gui = this.getValue(this.IDMERCHANTACCOUNTINFORMATIONGUI, 'BR.GOV.BCB.PIX')
        let key = this.getValue(this.IDMERCHANTACCOUNTINFORMATIONKEY, this.CHAVEPIX)
        let description = this.getValue(this.IDMERCHANTACCOUNTINFORMATIONDESCRIPTION, this.descricao)
        let info = this.getValue(this.IDMERCHANTACCOUNTINFORMATION, gui+key/* +description */)
        return info;
       //return this.getValue(IDMERCHANTACCOUNTINFORMATION, gui+key)
    }
    
    getPayload(){
        
        let payload = this.getValue(this.IDPAYLOADFORMATINDICATOR, '01')
            + this.getMerchantiAccountInformation()
            + this.getValue(this.IDMERCHANTCATEGORYCODE, '0000')
            + this.getValue(this.IDTRANSACTIONCURRENCY, '986')
        payload += this.getValue(this.IDTRANSACTIONAMOUNT,  this.valor)
        payload += this.getValue(this.IDCOUNTRYCODE, 'BR')
            + this.getValue(this.IDMERCHANTNAME, this.RECEBEDOR.substring(0,25))
            + this.getValue(this.IDMERCHANTCITY, 'FORTALEZA' /*cidade*/ ) //testei com Fortaleza mas da erro no código
            + this.getAddionalDataFielTemplate();
           
        this.codigoGerado = this.getCRC16(payload).toString()
    
        return this.codigoGerado
    }
    
}

export default Pix;

