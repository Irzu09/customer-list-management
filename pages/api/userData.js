import mysql from 'mysql2';

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default function handler(req, res) {
    if (req.method === "GET") {
        connection.query('SELECT * FROM userdata', (err, results) => {
            if (err) {
                res.status(200).json({ error: err });
                return;
            }
            res.status(200).json(results);
        })
    }
    else if (req.method === "POST") {
        const payload = JSON.parse(req.body);
        const { idUser, name, age, phoneNum, dob, icNumber, email, residencyStatus, address, investmentExp, riskTolerance, method } = payload;

        if (method === "Add") {
            connection.query(
                `INSERT INTO userdata (name, age, phoneNumber, dateOfBirth, icNumber, email, residencyStatus, address, investmentExp, riskTolerance) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                [name, age, phoneNum, dob, icNumber, email, residencyStatus, address, investmentExp, riskTolerance],
                (err, results) => {
                    if (err) {
                        res.status(200).json({ error: err });
                        return;
                    }
                    res.status(200).json({ success: "Created" });
                })
        }
        else if (method === "Delete") {
            connection.query(
                `DELETE FROM userdata WHERE id in (?)`, [idUser],
                (err, results) => {
                    if (err) {
                        res.status(200).json({ error: err });
                        return;
                    }
                    res.status(200).json({ success: "Deleted" });
                })
        }
    }
    else if (req.method === "PUT") {
        const payload = JSON.parse(req.body);
        const { id, name, age, phoneNum, dob, icNumber, email, residencyStatus, address, investmentExp, riskTolerance } = payload;

        connection.query(
            `UPDATE userdata set name=?, age=?, phoneNumber=?, dateOfBirth=?, icNumber=?, email=?, residencyStatus=?, address=?, investmentExp=?, riskTolerance=? WHERE id=?`,
            [name, age, phoneNum, dob, icNumber, email, residencyStatus, address, investmentExp, riskTolerance, id],
            (err, results) => {
                if (err) {
                    res.status(200).json({ error: err });
                    return;
                }
                res.status(200).json({ success: "Updated" });
            })
    }
    // connection.end();
}