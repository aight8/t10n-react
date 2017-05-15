import IStory from 'interface/IStory'

const API_BASE_URL = process.env.API_BASE_URL

export interface GetNewcomerStoriesData {
    stories: IStory[]
    record: IStory
}

export interface ApiError extends Error {
    type: string
    message: string
}

export interface GetNewcomerStoriesResponse extends GetNewcomerStoriesData {
    error?: ApiError
}

export class ServerApiError extends Error {
    type: string

    constructor(type: string, message: string) {
        super(message)
        this.type = type
    }

    toString() {
        return `${this.type}: ${this.message}`
    }
}

export default class ServerAPI {
    /**
     * The base API to the ruby server (with trailing slash)
     */
    private static apiBaseUrl = API_BASE_URL

    /**
     * Calls the given API endpoint (prepended by the base API URL) and returns the JSON as object
     */
    private static async fetchJsonEndpoint(endpoint: string): Promise<any> {
        try {
            const endpointUrl = `${this.apiBaseUrl}${endpoint}`
            const response = await fetch(endpointUrl)
            const data: GetNewcomerStoriesResponse = await response.json()
            if (typeof data.error === 'string') {
                // Development mode (Ruby internal errors)
                const { error, exception } = data as any
                throw new ServerApiError(error, exception)
            } else if (data.error instanceof Object) {
                const { type, message } = data.error
                throw new ServerApiError(type, message)
            }
            return data
        } catch (err) {
            console.error('fetchJsonEndpoint failed', err)
            throw err
        }
    }

    /**
     * Fetch the ordered top 10 newcomer stories
     * 
     * @throws Error
     */
    public static async fetchNewcomers(): Promise<GetNewcomerStoriesData> {
        const res: GetNewcomerStoriesResponse = await this.fetchJsonEndpoint('get_newcomer_stories')
        if (!res.stories) {
            throw new ServerApiError('ApiResponseError', 'The server responded with an invalid data structure.')
        }
        return res
    }
}