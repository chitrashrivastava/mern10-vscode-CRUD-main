var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/", function (req, res) {
    const folderpath = path.join(__dirname, "..", "public", "upload");
    const files = fs.readdirSync(folderpath);
    res.render("index", { files, filedata: null, filename: null });
});

router.post("/create", function (req, res, next) {
    try {
        const filepath = path.join(
            __dirname,
            "..",
            "public",
            "upload",
            req.body.filename
        );
        fs.writeFileSync(filepath, "//start coding here..");
        res.redirect(`/${req.body.filename}`);
    } catch (error) {
        res.send(error);
    }
});

router.get("/delete/:filename", function (req, res, next) {
    try {
        const filepath = path.join(
            __dirname,
            "..",
            "public",
            "upload",
            req.params.filename
        );
        fs.unlinkSync(filepath);
        res.redirect("/");
    } catch (error) {
        res.send(error);
    }
});

router.get("/:filename", function (req, res, next) {
    const folderpath = path.join(__dirname, "..", "public", "upload");
    const files = fs.readdirSync(folderpath);

    const filepath = path.join(
        __dirname,
        "..",
        "public",
        "upload",
        req.params.filename
    );
    const filedata = fs.readFileSync(filepath, "utf-8");
    res.render("index", { files, filedata, filename: req.params.filename });
});

router.post("/update/:filename", function (req, res, next) {
    try {
        const filepath = path.join(
            __dirname,
            "..",
            "public",
            "upload",
            req.params.filename
        );
        fs.writeFileSync(filepath, req.body.filedata);
        res.redirect(`/${req.params.filename}`);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
