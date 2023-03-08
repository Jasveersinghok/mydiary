const express = require("express");
const fetchUser = require("../middleware/gettingUser");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//rotue 1 : creating a notes
router.post(
  "/createnotes",
  fetchUser,
  body("title").isLength({ min: 3 }),
  body("description")
    .isLength({ min: 5 })
    .withMessage({ error: "enter atleast 5 charachters" }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
      const user = await new Notes({
        title,
        description,
        tag,
        user: req.id,
      });
      const data = await user.save();
      res.json(data);
    } catch (error) {
      res.status(401).send("internal server error " + error);
    }
  }
);
//route 2 : getting notes
router.get("/getnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.id });
    res.json(notes);
  } catch (error) {
    res.status(401).send("internal server error " + error);
  }
});
//route:3 updating notes
router.put(
  "/updatenotes/:id",
  fetchUser,
  body("title").isLength({ min: 3 }),
  body("tag").isLength({ min: 3 }),
  body("description")
    .isLength({ min: 5 })
    .withMessage({ error: "enter atleast 5 charachters" }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {tag,title,description} = req.body;
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(401).json({ message: "here is my message" });
      }
      console.log(req.id);
      if (note.user.toString() !== req.id) {
        return res.status(401).send("unauthorized user");
      }
      const newObj = {};
      if (title) {
        newObj.title = title;
      }
      if (description) {
        newObj.description = description;
      }
      if (tag) {
        newObj.tag = tag;
      }
      console.log(newObj);
      const data = await Notes.findByIdAndUpdate(
         req.params.id,
        { $set: newObj },
        { new: true }
      );
      res.json(data);
    } catch (error) {
      res.status(401).send("could not delete user j" + error);
    }
  }
);
//route 4 deleting
router.delete("/deleteNotes/:id",fetchUser,async(req,res)=>{
   try {
   const note = await Notes.findById(req.params.id);
   if (!note) {
     return res.status(401).json({ message: "id to this collection doesnot exist" });
   }
   console.log(req.id);
   if (note.user.toString() !== req.id) {
     return res.status(401).send("unauthorized user");
   }
   const data = await Notes.findByIdAndDelete(req.params.id)
      res.json(data)
   } catch (error) {
      res.status(401).send("could not delete user j" + error);
   }
})
module.exports = router;
