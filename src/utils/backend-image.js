export const getBackendImageUrl = (imagePath) => {
    if (!imagePath) {
        console.log('No image path provided');
        return null;
    }
    
    // ✅ FIX: Handle objects - extract filepath or image property
    let pathString = imagePath;
    if (typeof imagePath === 'object' && imagePath !== null) {
        // Try to extract filepath or image from object
        pathString = imagePath.filepath || imagePath.image || imagePath.path || imagePath.url || null;
        if (!pathString) {
            console.log('Image URL generation: Object provided but no valid path property found:', imagePath);
            return null;
        }
    }
    
    // If it's already a full URL, return as is
    if (typeof pathString === 'string' && (pathString.startsWith('http://') || pathString.startsWith('https://'))) {
        console.log('Image is already a full URL:', pathString);
        return pathString;
    }
    
    // Ensure we have a string at this point
    if (typeof pathString !== 'string') {
        console.log('Image URL generation: Invalid path type:', typeof pathString, pathString);
        return null;
    }
    
    // Backend API URL - use HTTP port 5050 by default (development)
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5050";
    console.log('Using base URL:', baseURL);
    
    // Normalize path separators (handle both Windows and Unix paths)
    let cleanPath = pathString.replace(/\\/g, '/');
    
    // Handle Windows absolute paths (e.g., C:/Users/.../uploads/filename.png)
    // Extract just the filename from Windows paths
    if (cleanPath.includes('uploads/')) {
        const uploadsIndex = cleanPath.indexOf('uploads/');
        cleanPath = cleanPath.substring(uploadsIndex + 'uploads/'.length);
    }
    
    // If the path starts with 'uploads/', remove it since the static route is already /uploads/
    if (cleanPath.startsWith('uploads/')) {
        cleanPath = cleanPath.replace('uploads/', '');
    }
    
    // Remove any leading slashes
    cleanPath = cleanPath.replace(/^\/+/, '');
    
    // Extract just the filename if it's a full path (handles Windows absolute paths)
    const pathParts = cleanPath.split('/');
    let filename = pathParts[pathParts.length - 1];
    
    // If filename is empty or just whitespace, return null
    if (!filename || filename.trim() === '') {
        console.log('Image URL generation: Empty filename after processing');
        return null;
    }
    
    const finalUrl = `${baseURL}/uploads/${filename}`;
    console.log('Image URL generation:', {
        original: imagePath,
        extracted: pathString,
        normalized: cleanPath,
        finalUrl: finalUrl
    });
    
    return finalUrl;
}


