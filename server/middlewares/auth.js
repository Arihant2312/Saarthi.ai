import { clerkClient } from "@clerk/express";

// Middleware to check if user has a premium plan
export const auth = async (req, res, next) => {
  try {
    const { userId, has } = await req.auth(); // FIX: 'userId', not 'userid'
    const hasPremium = await has({ plan: 'premium' }); // FIX: typo 'hasprem'

    const user = await clerkClient.users.getUser(userId);

    if (!hasPremium && user.privateMetadata?.free_usage != null) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }
req.userId = userId;
    req.plan = hasPremium ? 'premium' : 'free';
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export default auth;
