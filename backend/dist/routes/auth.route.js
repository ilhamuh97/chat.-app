"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let auths = [];
router.post('/', (req, res) => {
    const auth = {
        id: auths.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };
    auths.push(auth);
    res.status(201).json(auth);
});
exports.default = router;
