import apiConfig from "../configs/api.config"

export default function extractContributionImageSrcs(images) {
    if (!images) return []
    if (typeof(images) === 'string') {
        console.log("Extract Images", 'endswith', images.endsWith('/images/'))
        if (images.endsWith('/images/')) {
            return []
        }
        images = images.split(',')
    }
    console.log("Extract Images", images)
    
    // if is array
    if (Array.isArray(images)) return images.map(extractImageName).filter(x => !!x).map(x => apiConfig.host + x)
    return [apiConfig.host + extractImageName(images)]
}

function extractImageName(image) {
    console.log("Extract Image:", image)
    // if image is invalid or not string, return empty string.
    if (!image || typeof(image) !== 'string') return null
    if (image.endsWith('/images/')) return null
    // if something like blahblah/public/images/name.jpg
    // return the part after 'public'
    if (image.includes('public')) return image.split('public')[1]
    // Otherwise, assuming image name is like
    // 'Something.jpg' directly.
    // prefix /images/
    return '/images/' + image
}