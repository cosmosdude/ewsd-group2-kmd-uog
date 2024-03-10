import apiConfig from "../configs/api.config"

export default function extractContributionFileSrc(from) {
    if (!from) return undefined

    if (from.includes('public')) return apiConfig.host + from?.split('public')[1]

    return apiConfig + '/files/' + from
}