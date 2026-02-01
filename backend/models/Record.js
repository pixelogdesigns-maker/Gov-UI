const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
    village: { type: mongoose.Schema.Types.ObjectId, ref: 'Village', required: true },
    population: { type: Number, required: true },
    households: { type: Number, required: true },
    remarks: { type: String },
    date: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
