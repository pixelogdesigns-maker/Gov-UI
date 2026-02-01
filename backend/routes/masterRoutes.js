const express = require('express');
const router = express.Router();
const {
    getDistricts, createDistrict, updateDistrict,
    getVillages, createVillage, updateVillage
} = require('../controllers/masterController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Districts
router.route('/districts')
    .get(protect, getDistricts)
    .post(protect, authorize('Admin'), createDistrict);

router.route('/districts/:id')
    .put(protect, authorize('Admin'), updateDistrict);

// Villages
router.route('/villages')
    .get(protect, getVillages)
    .post(protect, authorize('Admin'), createVillage);

router.route('/villages/:id')
    .put(protect, authorize('Admin'), updateVillage);

module.exports = router;
