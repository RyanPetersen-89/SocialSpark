const { User, Thought } = require("../models");

module.exports = {
  // get all users - /api/users
  async getUsers(_req, res) {
    try {
      const users = await User.find()
        .populate("thoughts", "thoughtText createdAt reactions")
        .select("-__v");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a single user - /api/users/:userId
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .select("-__v")
        .populate("thoughts", "thoughtText createdAt reactions")
        .populate("friends", "username");

      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a user - /api/users
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update a user - /api/users/:userId
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        runValidators: true,
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a user and associated thoughts - /api/users/:userId
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a friend - /api/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
      const friend = await User.findById(req.params.friendId);
      if (!friend) {
        return res
          .status(404)
          .json({ message: "No user found with friend ID" });
      }
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json({ message: "Friend added successfully", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // remove a friend - /api/users/:userId/friends/:friendId
  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json({ message: "Friend removed successfully", user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};