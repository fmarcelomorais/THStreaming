const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


class Connection { 
    static async pool (){ 
        const con = new Pool({
            connectionString: process.env.CONNECTION_STRING,
            ssl: require
        })

        return con;
    }


    static async createTable(){ 
        const con = await this.pool();

        await con.query(`CREATE TABLE IF NOT EXISTS tbl_users (\
            id VARCHAR(255),\
            name VARCHAR(255) NOT NULL,\
            login VARCHAR(255) NOT NULL,\
            password VARCHAR(255) NOT NULL,\
            FK_site VARCHAR(255)

        )`)
            
        await con.query(`CREATE TABLE IF NOT EXISTS tbl_datas (\
                id VARCHAR(255),\
                nameSite VARCHAR(255) NOT NULL,\
                title VARCHAR(255) NOT NULL,\
                whatsapp VARCHAR(255) NOT NULL,\
                whatsappRev VARCHAR(255),\
                plan1 VARCHAR(255),\
                priceplan1 VARCHAR(10) ,\
                plan2 VARCHAR(255) ,\
                priceplan2 VARCHAR(10) ,\
                plan3 VARCHAR(255) ,\
                priceplan3 VARCHAR(10) ,\
                pricereseller VARCHAR(10) ,\
                priceactive VARCHAR(10) ,\
                textHeader VARCHAR(255) ,\
                facebook VARCHAR(255),\
                instagram VARCHAR(255),\
                linkPanel VARCHAR(255),\
                FK_user VARCHAR(255)
            )`
        )
    }

    
    static async login(params){
        const con = await this.pool();
        const data = await con.query("SELECT * FROM tbl_datas td INNER JOIN tbl_users tu ON td.fk_user = tu.id WHERE tu.login=$1 AND tu.password=$2", [params.login, params.password])       
        return data.rows
    }

    static async getDatas(){
        const con = await this.pool();
        const datas = await con.query('SELECT * FROM tbl_datas td INNER JOIN tbl_users tu ON td.FK_User = tu.id WHERE 0=0')
        return datas.rows
    }

    static async getData(params){
        const con = await this.pool();
        const data = await con.query("SELECT * FROM tbl_datas td INNER JOIN tbl_users tu ON td.fk_user = tu.id WHERE td.fk_user=$1", [params.id])
        return data.rows
    }

    static async createUser(params){
        const dados = [`${uuidv4()}`, params.name, params.login, params.password, params.idSite] 
        const con = await this.pool();
        await con.query('INSERT INTO tbl_users (id, name, login, password, FK_Site) VALUES ($1, $2, $3, $4, $5 );' , dados);
    }

    static async create(params){
        const dados = [`${uuidv4()}`, params.nameSite, params.title, params.whatsapp, params.whatsappRev, params.plan1, params.priceplan1, params.plan2, params.priceplan2, params.plan3, params.priceplan3, params.pricereseller, params.priceactive, params.textHeader, params.facebook, params.instagram, params.idUser] 
        const con = await this.pool();
        await con.query('INSERT INTO tbl_datas (id, nameSite, title, whatsapp, whatsappRev, plan1, priceplan1, plan2, priceplan2, plan3, priceplan3, pricereseller, priceactive, textHeader, facebook, instagram, FK_User ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17 );' , dados);
    }

    static async update(params){
        const dados = [ params.nameSite, params.title, params.whatsapp, params.whatsappRev, params.plan1, params.priceplan1, params.plan2, params.priceplan2, params.plan3, params.priceplan3, params.textHeader, params.facebook, params.instagram, params.idUser]     
        const con = await this.pool();
        await con.query('UPDATE tbl_datas SET nameSite=$1, title=$2, whatsapp=$3, whatsappRev=$4, plan1=$5, priceplan1=$6, plan2=$7, priceplan2=$8, plan3=$9, priceplan3=$10, textHeader=$11, facebook=$12, instagram=$13 WHERE FK_User=$14;' , dados);
    }
}


module.exports = Connection;