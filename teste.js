function testaHoras(horaInicialAgendamento, horaFinallAgendamento,  horaInicialBloqueio, horaFinalBloqueio){

    if( horaInicialAgendamento > horaInicialBloqueio && horaInicialAgendamento < horaFinalBloqueio ){
        if(horaFinallAgendamento > horaInicialBloqueio && horaFinallAgendamento < horaFinalBloqueio){

        }
    }
}

const hora = new Date().getHours().setHours +1
console.log(hora)
/*
    11:00 bloqueio
    14:00 



    13:00 agendamento
    14:00
*/
v
const horasBloqueio = []
for(let i = horaInicialBloqueio; i <= horaFinalBloqueio; i++) {
    horasBloqueio.push(i)
}

console.log(horasBloqueio)
