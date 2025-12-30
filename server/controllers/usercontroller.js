import sql from '../configs/db.js';

export const getUserCreations = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
        
        res.json({
            success: true,
            creations,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const getPublishedCreations = async (req, res) => {
    try {
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;
        
        res.json({
            success: true,
            creations,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Fixed like/dislike functionality
export const togglelikeCreations = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { id } = req.body;
        
        // Get the creation
        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;
        if (!creation) {
            return res.json({ success: false, message: 'creation not found' });
        }
        
        const currentLikes = creation.likes || []; // ✅ Fixed typo: currenelikes → currentLikes
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;
        
        if (currentLikes.includes(userIdStr)) {
            // Remove like
            updatedLikes = currentLikes.filter(user => user !== userIdStr); // ✅ Fixed filter syntax
            message = 'creation unliked';
        } else {
            // Add like
            updatedLikes = [...currentLikes, userIdStr];
            message = 'creation liked';
        }
        
        // Update in database - Fixed table name and array handling
        await sql`UPDATE creations SET likes = ${updatedLikes} WHERE id = ${id}`; // ✅ Fixed: cretions → creations
        
        res.json({
            success: true,
            message,
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
