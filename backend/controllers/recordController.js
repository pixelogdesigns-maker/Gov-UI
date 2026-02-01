const Record = require('../models/Record');

exports.createRecord = async (req, res) => {
    try {
        const { district, village, population, households, remarks, date } = req.body;
        const record = await Record.create({
            district,
            village,
            population,
            households,
            remarks,
            date,
            createdBy: req.user._id
        });
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getRecords = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                remarks: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const filter = { ...keyword };
        if (req.query.district) filter.district = req.query.district;
        if (req.query.village) filter.village = req.query.village;

        // Date Range
        if (req.query.startDate && req.query.endDate) {
            filter.date = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }

        const count = await Record.countDocuments(filter);
        const records = await Record.find(filter)
            .populate('district', 'name')
            .populate('village', 'name')
            .populate('createdBy', 'name')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort('-createdAt');

        res.json({ records, page, pages: Math.ceil(count / pageSize), total: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const totalRecords = await Record.countDocuments();
        // Aggregation for daily stats could be added here
        res.json({ totalRecords });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Export All (no pagination)
exports.getAllRecordsForExport = async (req, res) => {
    try {
        const filter = {}; // Apply similar filters if needed
        if (req.query.district) filter.district = req.query.district;

        const records = await Record.find(filter)
            .populate('district', 'name')
            .populate('village', 'name')
            .populate('createdBy', 'name')
            .sort('-createdAt');

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
