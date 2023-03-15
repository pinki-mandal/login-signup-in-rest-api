const {validationResult} = require('express-validator');
// According to the official website, Express Validator is a set of Express. 
// js middleware that wraps validator. js ,
//  a library that provides validator and sanitizer functions. 
const bcrypt = require('bcryptjs');
// BCrypt Algorithm is used to hash and salt passwords securely. 
const conn = require('../dbConnection').promise();

// exports is a special object which is included in
//  every JavaScript file in the Node. js application by default.
exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        // Hashing is the process of transforming any
        //  given key or a string of characters into another value. 
        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)',[
            req.body.name,
            req.body.email,
            hashPass
        ]);
        // HashPass is an unconventional password generator
        //  that hashes text and converts them to strong passwords. 
        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
    }catch(err){
        next(err);
    }
}
