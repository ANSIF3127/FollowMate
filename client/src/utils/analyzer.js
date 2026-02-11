
/**
 * Analyze relationships between followers and following
 * @param {string[]} followersList 
 * @param {string[]} followingList 
 */
export const analyzeRelationships = (followersList, followingList) => {
    const followers = new Set(followersList);
    const following = new Set(followingList);

    const notFollowingBack = followingList.filter(user => !followers.has(user));
    const fans = followersList.filter(user => !following.has(user)); // People who follow you but you don't follow back
    const mutual = followingList.filter(user => followers.has(user));

    return {
        notFollowingBack,
        fans,
        mutual,
        stats: {
            totalFollowers: followers.size,
            totalFollowing: following.size,
            totalNotFollowingBack: notFollowingBack.length,
            totalFans: fans.length,
            totalMutual: mutual.length
        }
    };
};
