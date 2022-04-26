const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path: 'posts',
            populate: {
                path: 'userId'
            }
        })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, themeProcedure/*, postText */ } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ themeName, userId, themeProcedure/*, subscribers: [userId] */ })
        .then(theme => {
            res.status(200).json(theme)
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

function deleteTheme(req, res, next){
    const {themeId, userId}=req.params;

    Promise.all([
        //postModel.findOneAndDelete({ _id: postId, userId }),
        themeModel.findOneAndDelete({ _id: themeId }),
        //userModel.findOneAndUpdate({ _id: userId }),
    ])
        .then(([deletedOne]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    deleteTheme
}
//router.delete('/:themeId', auth(), themeController.deleteTheme);
/*function deletePost(req, res, next) {
    const { postId, themeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        postModel.findOneAndDelete({ _id: postId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
        themeModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}*/