const express = require('express');
const router = express.Router();
const gadgetController = require('../controllers/gadgetController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

// Authentication
router.post('/auth/login', authController.login);

// Gadget routes
router.get('/gadgets', authMiddleware, gadgetController.getAllGadgets);
router.post('/gadgets', authMiddleware, gadgetController.createGadget);
router.patch('/gadgets/:id', authMiddleware, gadgetController.updateGadget);
router.delete('/gadgets/:id', authMiddleware, gadgetController.decommissionGadget);

// Self-destruct
router.post('/gadgets/:id/self-destruct', authMiddleware, gadgetController.selfDestruct);

module.exports = router;