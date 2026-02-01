const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const District = require('./models/District');
const Village = require('./models/Village');

dotenv.config();

const seedData = async () => {
    try {
        // Don't close connection here, it uses the shared connection
        await User.deleteMany();
        await District.deleteMany();
        await Village.deleteMany();

        // Admin User
        await User.create({
            name: 'System Admin',
            email: 'admin@gov.in',
            password: 'password123',
            role: 'Admin'
        });

        // Operator User
        await User.create({
            name: 'Data Operator',
            email: 'operator@gov.in',
            password: 'password123',
            role: 'Operator'
        });

        // Districts
        const d1 = await District.create({ name: 'Central District', code: 'D001' });
        const d2 = await District.create({ name: 'North District', code: 'D002' });

        // Villages
        await Village.create([
            { name: 'Shivpur', code: 'V001', district: d1._id },
            { name: 'Rampur', code: 'V002', district: d1._id },
            { name: 'Lakhanpur', code: 'V003', district: d2._id },
        ]);

        console.log('✅ Data Seeded Successfully');
    } catch (error) {
        console.error('❌ Error Seeding Data:', error);
    }
};

if (require.main === module) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB Connected for Seeding');
            seedData().then(() => mongoose.disconnect());
        })
        .catch(err => console.log(err));
}

module.exports = seedData;
