const mysql = require("mysql");


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('index', {
                message: 'Please provide all details'
            });


        }
        connection.query('SELECT * FROM login WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            console.log(password);
            console.log(results[0].password)
            if (password != results[0].password) {
                console.log("not equal");
                return res.status(401).render('index', {
                    message: 'Email or password in incorrect',

                });

            }
            else {
                console.log("yess");
                const id = results[0].id;
                res.status(200).redirect("/Second");
            }

        })


    } catch (error) {
        console.log(error);
    }
}