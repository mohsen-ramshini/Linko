const express = require("express");
const searchController = require("../controllers/searchController");
const router = express.Router();

router.get("/", searchController.generalSearch);
router.get("/users", searchController.searchUsers);
router.get("/posts", searchController.searchPosts);
router.get("/hashtags", searchController.searchHashtags);
router.get("/suggestions", searchController.getSearchSuggestions);

module.exports = router;
