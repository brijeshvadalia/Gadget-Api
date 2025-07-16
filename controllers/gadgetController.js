const { Gadget } = require('../models');
const generateCodename = require('../utils/codenameGenerator');
const generateProbability = require('../utils/probabilityGenerator');

exports.getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    
    const gadgets = await Gadget.findAll({ where });
    const result = gadgets.map(gadget => ({
      ...gadget.toJSON(),
      missionSuccessProbability: `${generateProbability()}%`
    }));
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Mission compromised!', error });
  }
};

exports.createGadget = async (req, res) => {
  try {
    const gadget = await Gadget.create({
      ...req.body,
      codename: generateCodename()
    });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(400).json({ message: 'Gadget creation failed', error });
  }
};

exports.updateGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });
    
    await gadget.update(req.body);
    res.json(gadget);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error });
  }
};

exports.decommissionGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });
    
    await gadget.update({
      status: 'Decommissioned',
      decommissionedAt: new Date()
    });
    
    res.json({ message: 'Gadget decommissioned successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Decommission failed', error });
  }
};

exports.selfDestruct = async (req, res) => {
  try {
    const gadget = await Gadget.findByPk(req.params.id);
    if (!gadget) return res.status(404).json({ message: 'Gadget not found' });
    
    const confirmationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    
    // In real scenario: Send code to authenticated agent
    // For demo: Immediately destroy after confirmation
    
    await gadget.update({
      status: 'Destroyed',
      destroyedAt: new Date()
    });
    
    res.json({ 
      message: 'Self-destruct sequence completed',
      confirmationCode,
      gadgetId: gadget.id
    });
  } catch (error) {
    res.status(400).json({ message: 'Self-destruct failed', error });
  }
};