import apiConfig from "../configs/api.config"

export default function extractContributionImageSrcs(images) {
    if (!images) return []
    if (typeof(images) === 'string') images = images.split(',')
    // if is array
    if (Array.isArray(images)) return images.map(extractImageName).map(x => apiConfig.host + x)
    return [apiConfig.host + extractImageName(images)]
}

function extractImageName(image) {
    // if image is invalid or not string, return empty string.
    if (!image || typeof(image) !== 'string') return ""
    // if something like blahblah/public/images/name.jpg
    // return the part after 'public'
    if (image.includes('public')) return image.split('public')[1]
    // Otherwise, assuming image name is like
    // 'Something.jpg' directly.
    // prefix /images/
    return '/images/' + image
}