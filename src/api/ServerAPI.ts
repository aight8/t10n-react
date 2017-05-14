import IStory from '../interface/IStory'

interface GetNewComersResponse {
    stories: IStory[]
    error?: string
}

export default class ServerAPI {
    /**
     * The base API to the ruby server (with trailing slash)
     */
    private static apiBaseUrl = 'http://localhost:10600/api/'

    /**
     * Calls the given API endpoint (prepended by the base API URL) and returns the JSON as object
     */
    private static async fetchJsonEndpoint(endpoint: string): Promise<any> {
        try {
            const endpointUrl = `${this.apiBaseUrl}${endpoint}`
            const response = await fetch(endpointUrl)
            return await response.json()
        } catch (err) {
            console.error(err)
        }
    }

    /**
     * Fetch the ordered top 10 newcomer stories
     * 
     * @throws Error
     */
    public static async fetchNewcomers(): Promise<IStory[]> {
        const res: GetNewComersResponse = await this.fetchJsonEndpoint('get_newcomer_stories')
        if (res.error) {
            throw new Error(res.error)
        }
        return res.stories
    }
}