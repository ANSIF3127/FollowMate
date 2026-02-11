/**
 * Instagram JSON Parser with Format Normalization
 * Handles structural differences between followers.json and following.json
 */

/**
 * Safely extract username from any Instagram JSON item
 * @param {Object} item - Instagram data item
 * @returns {string|null} - Username or null
 */
const safeGetUsername = (item) => {
    try {
        // FOLLOWERS FORMAT: string_list_data[0].value
        if (item?.string_list_data?.[0]?.value) {
            const username = item.string_list_data[0].value.trim();
            if (username) {
                return username;
            }
        }

        // FOLLOWING FORMAT: title field
        if (item?.title && typeof item.title === 'string') {
            const username = item.title.trim();
            if (username && username !== "") {
                return username;
            }
        }

        // FALLBACK: Extract from href URL
        if (item?.string_list_data?.[0]?.href) {
            const href = item.string_list_data[0].href;
            const parts = href.split('/').filter(Boolean);
            if (parts.length > 0) {
                const username = parts[parts.length - 1];
                if (username && username !== 'instagram.com') {
                    return username;
                }
            }
        }

        return null;
    } catch (error) {
        console.warn('[Parser] Error extracting username from item:', error);
        return null;
    }
};

/**
 * Normalize Instagram JSON data into username array
 * Handles both followers.json and following.json formats
 * @param {Object|Array} json - Raw Instagram JSON data
 * @returns {string[]} - Array of unique usernames
 */
const normalizeInstagramData = (json) => {
    let rawList = [];

    console.log('[Parser] Normalizing data structure...');
    console.log('[Parser] Input type:', Array.isArray(json) ? 'Array' : 'Object');
    console.log('[Parser] Keys:', typeof json === 'object' ? Object.keys(json) : 'N/A');

    // FOLLOWING JSON FORMAT: { relationships_following: [...] }
    if (json?.relationships_following && Array.isArray(json.relationships_following)) {
        console.log('[Parser] ✓ Detected FOLLOWING format (relationships_following)');
        console.log('[Parser] Items count:', json.relationships_following.length);
        rawList = json.relationships_following;
    }
    // FOLLOWERS JSON FORMAT: Direct array [...]
    else if (Array.isArray(json)) {
        console.log('[Parser] ✓ Detected FOLLOWERS format (direct array)');
        console.log('[Parser] Items count:', json.length);
        rawList = json;
    }
    // ALTERNATIVE FOLLOWING FORMAT: { following: [...] }
    else if (json?.following && Array.isArray(json.following)) {
        console.log('[Parser] ✓ Detected alternative FOLLOWING format (following key)');
        console.log('[Parser] Items count:', json.following.length);
        rawList = json.following;
    }
    // ALTERNATIVE FOLLOWERS FORMAT: { followers: [...] }
    else if (json?.followers && Array.isArray(json.followers)) {
        console.log('[Parser] ✓ Detected alternative FOLLOWERS format (followers key)');
        console.log('[Parser] Items count:', json.followers.length);
        rawList = json.followers;
    }
    else {
        console.error('[Parser] ✗ Unsupported Instagram JSON format');
        console.error('[Parser] Available keys:', typeof json === 'object' ? Object.keys(json) : 'none');
        return [];
    }

    // Extract and deduplicate usernames
    const usernames = rawList
        .map((item, idx) => {
            const username = safeGetUsername(item);
            if (!username && idx < 3) {
                console.warn(`[Parser] Failed to extract username from item ${idx}:`, item);
            }
            return username;
        })
        .filter(Boolean);

    // Remove duplicates
    const uniqueUsernames = [...new Set(usernames)];

    console.log(`[Parser] ✓ Extracted ${uniqueUsernames.length} unique usernames`);

    // Show sample
    if (uniqueUsernames.length > 0) {
        const sample = uniqueUsernames.slice(0, 5);
        console.log('[Parser] Sample:', sample);
    }

    return uniqueUsernames;
};

/**
 * Parse JSON file with format detection and normalization
 * @param {string} content - File content as string
 * @returns {string[]} - Array of usernames
 */
export const parseJSON = (content) => {
    try {
        console.log('[Parser] ========================================');
        console.log('[Parser] Starting JSON parse...');
        console.log('[Parser] Content length:', content.length);

        const json = JSON.parse(content);
        const usernames = normalizeInstagramData(json);

        if (usernames.length === 0) {
            console.error('[Parser] ✗ No usernames extracted!');
            console.error('[Parser] This might not be a valid Instagram export file.');
        }

        console.log('[Parser] ========================================');
        return usernames;

    } catch (error) {
        console.error('[Parser] ✗ JSON Parse Error:', error.message);
        throw new Error(`Failed to parse JSON: ${error.message}`);
    }
};

/**
 * Parse HTML file from Instagram export
 * @param {string} content - HTML content as string
 * @returns {string[]} - Array of usernames
 */
export const parseHTML = (content) => {
    try {
        console.log('[Parser] ========================================');
        console.log('[Parser] Starting HTML parse...');

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const usernames = new Set();

        // Strategy 1: Find all links
        const links = doc.querySelectorAll('a');
        console.log(`[Parser] Found ${links.length} links in HTML`);

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('instagram.com/')) {
                // Extract from text content first (most reliable)
                let text = link.textContent ? link.textContent.trim() : '';

                // Refined Validation:
                // 1. Not empty
                // 2. Not specific keywords like 'Profile', 'Instagram'
                // 3. No spaces (usernames don't have spaces)
                // 4. Reasonable length (1-30 chars)
                if (text &&
                    text !== 'Profile' &&
                    text !== 'Instagram' &&
                    !text.includes(' ') &&
                    text.length > 0 &&
                    text.length <= 30) {

                    usernames.add(text);
                    return;
                }

                // Fallback to URL parsing
                try {
                    const url = new URL(href, 'https://instagram.com');
                    const pathParts = url.pathname.split('/').filter(Boolean);

                    // Check first part of path
                    if (pathParts.length > 0) {
                        const candidate = pathParts[0];
                        // Validate candidate from URL
                        if (candidate !== 'explore' &&
                            candidate !== 'p' &&
                            candidate !== 'reels' &&
                            candidate !== 'stories' &&
                            !candidate.includes('login')) {
                            usernames.add(candidate);
                        }
                    }
                } catch (e) {
                    // Invalid URL, skip
                }
            }
        });

        const uniqueUsernames = Array.from(usernames);
        console.log(`[Parser] ✓ Extracted ${uniqueUsernames.length} unique usernames from HTML`);

        if (uniqueUsernames.length > 0) {
            const sample = uniqueUsernames.slice(0, 5);
            console.log('[Parser] Sample:', sample);
        }

        console.log('[Parser] ========================================');
        return uniqueUsernames;

    } catch (error) {
        console.error('[Parser] ✗ HTML Parse Error:', error.message);
        throw new Error(`Failed to parse HTML: ${error.message}`);
    }
};
