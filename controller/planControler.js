const { planModel } = require("../model/planModel");

async function getAllPlansController(req, res) {
  try {
    let plans = await planModel.find();

    res.status(200).json({ plans: plans });
  } catch (err) {
    res.status(500).json({ result: err });
  }
}
async function createPlanController(req, res) {
  try {
    let planObj = req.body;

    const name = planObj.name;
    const price = planObj.price;
    const duration = planObj.duration;

    if (name && price && duration) {
      let addPlan = await planModel.create(planObj);
      res.status(201).json(addPlan);
    } else {
      res.status(400).json({ result: "Enter all Details" });
    }
  } catch (err) {
    res.status(500).json({ result: err.message });
  }
}
async function updateUserController(req, res) {
  try {
    let planObj = req.body;
    let id = req.params.id;

    if (Object.keys(planObj).length > 0) {
      let update = await planModel.findByIdAndUpdate(id, planObj, {
        runValidators: true,
        new: true,
      });

      update.save();
      res.status(200).json(update);
    } else {
      res.status(400).json({ result: "Enter data" });
    }
  } catch (err) {
    res.status(500).json({ result: err.message });
  }
}
async function deleteUserController(req, res) {
  try {
  } catch (err) {}
}
async function getPlansController(req, res) {
  try {
    let id = req.params.id;
    let plans = await planModel.findById(id);

    res.status(200).json({ plans });
  } catch (err) {
    res.json(err.message);
  }
}

module.exports = {
  // getUser,
  getAllPlansController,
  createPlanController,
  updateUserController,
  deleteUserController,
  getPlansController,
};
