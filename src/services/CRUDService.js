const connection = require("../config/database")
const User = require("../models/user")

const getAllUsers = async () => {
    let [results, fields] = await connection.query('select * from Users');
    return results;
}

const getUserById = async (userId) => {

    let results = await User.findById(userId).exec();
    console.log(results);
    // let user = results && results.length > 0 ? results[0] : {}

    return results;
}

const updateUserById = async (email, myname, city, userId) => {
    // const [results, fields] = await connection.execute(
    //     `UPDATE Users
    //     SET email = ? , name = ?, city = ?
    //     WHERE id = ?`,
    //     [email, myname, city, userId],

    // );

    const results = await User.updateOne({ _id: userId }, { email, name: myname, city });
    return results;
}

const deleteUserById = async (userId) => {
    // const [results, fields] = await connection.execute(
    //     `DELETE FROM Users WHERE id = ?`,
    //     [userId],
    // );

    const user = await User.deleteOne({ _id: userId });
    return user;
}



module.exports = {
    getAllUsers, getUserById,
    updateUserById, deleteUserById
}