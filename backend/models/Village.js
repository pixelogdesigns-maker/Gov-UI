const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Village', villageSchema);
