import {
    Router
} from 'express';
import { Accounts } from './../business/accounts';


const router = Router();
const account = new Accounts();

const _module = 'routes.accounts.js'

router.get('/', async (req, res) => {
    let response = await account.getAccounts();
    if (response && response.status)             
        response.message = 'fetch accounts successfully!';
        
    res.send(response);
});
router.post('/', async (req, res) => {
    let response = await account.createAccounts(req.body);
    if (response && response.status)             
        response.message = 'inserted successfully!';
    res.send(response);
});
router.put('/', async (req, res) => {
    let response = await account.updateAccounts(req.body);
    console.log('updated')
    if (response && response.status)             
        response.message = 'updated successfully!';
        
    res.send(response);
});
router.delete('/', async (req, res) => {
    let response = await account.deleteAccounts(req.body);
    console.log('deleted')
    if (response && response.status)             
        response.message = 'deleted successfully!';
        
    res.send(response);
});

export default router;