const express = require('express');
const router = express.Router();
const { createRecord, getRecords, getStats, getAllRecordsForExport } = require('../controllers/recordController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getRecords)
    .post(protect, createRecord);

router.route('/export')
    .get(protect, authorize('Admin'), getAllRecordsForExport); // Allow all authenticated roles to export? Or restricted? User req says Admin-only access for "Export & Reports".

router.route('/stats')
    .get(protect, authorize('Admin'), getStats);

module.exports = router;
