export const getBackendImageUrl = (imagePath) => {
    if (!imagePath) {
        console.log('No image path provided');
        return null;
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        console.log('Image is already a full URL:', imagePath);
        return imagePath;
    }
    
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5050";
    console.log('Using base URL:', baseURL);
    
    // Normalize path separators (handle both Windows and Unix paths)
    let cleanPath = imagePath.replace(/\\/g, '/');
    
    // If the path starts with 'uploads/', remove it since the static route is already /uploads/
    if (cleanPath.startsWith('uploads/')) {
        cleanPath = cleanPath.replace('uploads/', '');
    }
    
    // Remove any leading slashes
    cleanPath = cleanPath.replace(/^\/+/, '');
    
    const finalUrl = `${baseURL}/uploads/${cleanPath}`;
    console.log('Image URL generation:', {
        original: imagePath,
        normalized: cleanPath,
        finalUrl: finalUrl
    });
    
    return finalUrl;
}


