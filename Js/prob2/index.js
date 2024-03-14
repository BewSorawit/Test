const express = require('express')
const mysql = require('mysql2/promise')
const { Sequelize, DataTypes, where } = require('sequelize')

const app = express()
app.use(express.json())

const port = 8000

let conn = null

// function init connection mysql
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test_orm'
    })
}


// use sequenlize
const sequelize = new Sequelize('test_orm', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})


// ทั้งสร้างและ validation
const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
}, {})

// เพิ่ม table address เข้ามา
const Address = sequelize.define('addresses', {
    address1: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {})

// ประกาศ relation แบบปกติ
// User.hasMany(Address)

// relation แบบผูกติด (จะสามารถลบไปพร้อมกันได้) = พิจารณาเป็น case by case ไป
User.hasMany(Address, { onDelete: 'CASCADE' })

Address.belongsTo(User)

app.get('/api/users', async (req, res) => {
    try {
        // แบบ Query แบบเก่า
        // const [result] = await conn.query('SELECT * from users')

        // query ผ่าน model แทน
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        console.error(err)
    }
})

app.get('/api/users/:id/address', async (req, res) => {
    try {
        const userId = req.params.id
        // แบบ Query แบบเก่า
        // const [result] = await conn.query('SELECT users.*, addresses.address1 FROM users LEFT JOIN addresses on users.id = addresses.userId WHERE users.id = ?', userId)

        // query ผ่าน model แทน
        const result = await User.findOne({
            where: { id: userId },
            include: {
                model: Address
            }
        })

        // หรือจะใช้กับ findAll ก็ได้
        // const result = await User.findAll({
        //   where: { id: userId },
        //   include: {
        //     model: Address
        //   },
        //   // raw: true ใส่เพื่อให้เหมือน LEFT JOIN
        // })

        res.json(result)
    } catch (err) {
        console.error(err)
        res.json(err)
    }
})

app.post('/api/users', async (req, res) => {
    try {
        const userData = req.body
        // แบบ Query แบบเก่า
        // const [result] = await conn.query('INSERT INTO users SET ?', data)

        // ท่า Model
        const user = await User.create(userData)
        const addressData = userData.addresses
        let addressCreated = []
        // foreach
        for (let i = 0; i < addressData.length; i++) {
            let cAddressData = addressData[i]
            cAddressData.userId = user.id
            const address = await Address.create(cAddressData)
            addressCreated.push(address)
        }
        res.json({
            user,
            address: addressCreated
        })

    } catch (err) {
        console.error(err)
        res.json({
            message: 'something went wrong',
            error: err.errors.map(e => e.message)
        })
    }
})

app.put('/api/users/:id', async (req, res) => {
    try {
        const data = req.body
        const userId = req.params.id
        // แบบ Query แบบเก่า
        //  const result = await conn.query('UPDATE users SET ? WHERE id = ?', [data, id])

        // ท่า Model
        const userUpdateResult = await User.update(data, { where: { id: userId } })

        const addressData = data.addresses
        for (let i = 0; i < addressData.length; i++) {
            let cAddressData = addressData[i]
            cAddressData.userId = userId
            await Address.upsert(cAddressData)
        }

        res.json({
            message: 'update complete!',
            user: userUpdateResult
        })
    } catch (err) {
        console.error(err)
        res.json({
            message: 'something went wrong',
            error: err.errors.map(e => e.message)
        })
    }
})

app.delete('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id
        // แบบ Query แบบเก่า
        // const [result] = await conn.query('DELETE FROM users WHERE id = ?', [id])

        // query ผ่าน model แทน
        const result = await User.destroy({
            where: { id: userId }
        })


        res.json({
            message: 'delete successful',
            result
        })
    } catch (err) {
        console.error(err)
        res.json(err)
    }
})

// Listen
app.listen(port, async () => {
    await initMySQL()
    await sequelize.sync()
    // await sequelize.sync({ force: true })

    console.log('Server started at port 8000')
})