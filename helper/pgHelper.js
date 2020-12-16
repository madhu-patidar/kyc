import  { Pool }  from 'pg';

exports.ExecuteQuery = async (config, pgFunction, params = []) => {
    let query = 'SELECT ' + pgFunction + '(';
    for (var i=1; i <= params.length; ++i ) {
        query += i > 1 ? ', $' + i : '$' + i ;
        i++;
     }
    query += ')';
    let response = {
        status: false,
        message: "",
        data: [],
        rowCount: 0
    }
    const pool = new Pool({
        connectionString: config
    });
    
    try {
     let res = await pool.query(query, params);
        let dbresults = res.rows;
        let rowCount = res.rowCount
        response = {
            rowCount: rowCount,
            status: true,
            message: "success",
            data: dbresults
        }
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
    return response;
}