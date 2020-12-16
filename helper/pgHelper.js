import  { Pool }  from 'pg';

exports.ExecuteQuery = async (config, pgFunction, params = "") => {
    if(typeof pgFunction  != 'string') return [];
    console.log(pgFunction);
    let response = {
        status: false,
        message: "",
        data: ""
    }
    const pool = new Pool({
        connectionString: config
    });
    
    await pool.connect()
        .catch(function (err) {
            console.log('pool.connect() failed : ', err.message, new Date().toSqlDate())
        });
    try {
       return pool.query(pgFunction, params).then(res =>{
            let dbresults = res.rows;
            response = {
                status: true,
                message: "success",
                data: dbresults
            }
            return response
        })
    } catch (err) {
        response = {
            status: false,
            message: err.message,
            data: ""
        }
        console.log(`ExecuteQuery_Exception err=${err.message}`);
    } finally {
        try {
            pool.end();
        } catch (errpool) {
            console.log('error closing pool', errpool.message);
        }
    }
}

exports.GenerateQuery =  (functionName, columnArr = []) =>{
    let query = 'SELECT ' + functionName + '(';
    let i = 1;
    columnArr.forEach(element => {
        query += i > 1 ? ', $' + i : '$' + i ;
        i++;
    });
    query += ')';
    return query;
}