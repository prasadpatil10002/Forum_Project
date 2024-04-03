const {Post,User} = require('../models');

async function createPost(req,res){
    try{
        const {content} = req.body;
        const {userid} = req.user;

        const post = await Post.create({content,userid});
        
        res.status(201).json({success:true,data:post});

    }catch(err){
        console.log('Error Creating Post : '+err);
        res.status(500).json({success:false,message : 'Internal server error'});
    }
}

async function updatePost(req,res){
    const {postid} = req.params;
    const {content} = req.body;
    const {userid} = req.user;

    try{
        const post = await Post.findOne({where:{postid,userid}});
        if(!post){
            return res.status(404).json({success:false,message : 'Post not found'});
        }
        post.content = content;
        await post.save();
        res.status(200).json({success:true,data:post,message:"Post updated successfully"});
    }catch(err){
        console.log('Error updating Post : '+err);
        res.status(500).json({success:false,message : 'Internal server error'});
    }

}

async function deletePost(req,res){
    const {postid} = req.params;
    const {userid} = req.user;

    try{
        const post = await Post.findOne({where:{postid,userid}});
        if(!post){
            return res.status(404).json({success:false,message : 'Post not found'});
        }
        await post.destroy();
        res.status(200).json({success:true,message:"Post deleted successfully"});
    }catch(err){
        console.log('Error deleting Post : '+err);
        res.status(500).json({success:false,message : 'Internal server error'});
    }
}

async function getuserPosts(req,res){
    try {
        const userid = req.query.userid;
        const userPosts = await Post.findAll({ where: { userid } ,
        include: {model: User, attributes: ['username']}});
        res.json(userPosts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Error fetching user posts' });
      }
}

async function getAllPosts(req,res){
    try {
        const posts = await Post.findAll({
            include: {model: User, attributes: ['username']}
        });
        res.json(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
      }
}

module.exports = {createPost,updatePost,deletePost,getuserPosts,getAllPosts};