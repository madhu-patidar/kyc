
import { localConfig } from '../config';
import constants from '../config/constants';
import {
    ExecuteQuery, GenerateQuery
} from '../helper/pgHelper'

const connectionString = `postgres://${localConfig.user}:${localConfig.password}@${localConfig.server}:${localConfig.port}/${localConfig.database}`;
class Accounts {
   

    async getAccounts() {
        let draResults = null;
        try {
            draResults = await ExecuteQuery(connectionString, '* from ' + constants.fUNS.fun_kyc_get_accounts );

            if (draResults)
                draResults = draResults
            else
                draResults = null;
        }
        catch (err) {
            console.log(err)
        }
        return draResults;
    }

    async createAccounts(params) {
        let draResults = null;
        try {
            draResults = await ExecuteQuery(connectionString, constants.fUNS.fun_kyc_save_accounts, [params.id, params.name, params.balance] );

            if (draResults)
                draResults = draResults
            else
                draResults = null;
        }
        catch (err) {
            console.log(err)
        }
        return draResults;
    }
    async updateAccounts(params) {
        let draResults = null;
        try {
            draResults = await ExecuteQuery(connectionString, constants.fUNS.fun_kyc_update_accounts, [params.name, params.id]);

            if (draResults)
                draResults = draResults
            else
                draResults = null;
        }
        catch (err) {
            console.log(err)
        }
        return draResults;
    }
    async deleteAccounts(params) {
        let draResults = null;
        try {
            draResults = await ExecuteQuery(connectionString, constants.fUNS.fun_kyc_delete_accounts, [params.id] );

            if (draResults)
                draResults = draResults
            else
                draResults = null;
        }
        catch (err) {
            console.log(err)
        }
        return draResults;
    }
}    

export {
    Accounts
};