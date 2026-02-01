const District = require('../models/District');
const Village = require('../models/Village');

// --- Districts ---
exports.getDistricts = async (req, res) => {
    try {
        const districts = await District.find({});
        res.json(districts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDistrict = async (req, res) => {
    try {
        const { name, code } = req.body;
        const district = await District.create({ name, code });
        res.status(201).json(district);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateDistrict = async (req, res) => {
    try {
        const district = await District.findById(req.params.id);
        if (district) {
            district.name = req.body.name || district.name;
            district.code = req.body.code || district.code;
            district.status = req.body.status || district.status;
            const updated = await district.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'District not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --- Villages ---
exports.getVillages = async (req, res) => {
    try {
        const query = {};
        if (req.query.district) query.district = req.query.district;

        const villages = await Village.find(query).populate('district', 'name');
        res.json(villages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createVillage = async (req, res) => {
    try {
        const { name, code, district } = req.body;
        const village = await Village.create({ name, code, district });
        res.status(201).json(village);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVillage = async (req, res) => {
    try {
        const village = await Village.findById(req.params.id);
        if (village) {
            village.name = req.body.name || village.name;
            village.code = req.body.code || village.code;
            village.district = req.body.district || village.district;
            village.status = req.body.status || village.status;
            const updated = await village.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Village not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
