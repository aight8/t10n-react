import './style.scss'
import 'semantic-ui-css/semantic.min.css'

import * as React from 'react'
import autobind from 'autobind-decorator'
import * as SeamlessImmutable from 'seamless-immutable'
import StoryList from 'components/story-list'
import IStory from 'interface/IStory'
import { default as ServerAPI, ServerApiError } from 'api/ServerAPI'
import ReactTimeago from 'react-timeago'
import { Button, Header, Container } from 'semantic-ui-react'

const sleep = (ms: number) => new Promise((resolve, reject) => setTimeout(resolve, ms))

export interface Props {

}

export interface State {
    stories: IStory[]
    lastUpdateAt: number | null
    isLoading: boolean
    autorefreshEnabled: boolean
    error?: string
}

export default class App extends React.Component<Props, State> {
    autorefreshRunning = false

    constructor() {
        super()

        this.state = {
            stories: [],
            lastUpdateAt: null,
            isLoading: false,
            autorefreshEnabled: false
        }
    }

    componentDidMount() {
        this.refreshItems()
    }

    @autobind
    refreshItems(): Promise<{}> {
        return new Promise((resolve, reject) => {
            this.setState({
                error: undefined,
                isLoading: true
            }, async () => {
                try {
                    const stories = await ServerAPI.fetchNewcomers()

                    this.setState({
                        stories,
                        lastUpdateAt: Date.now(),
                        isLoading: false
                    })
                    resolve(undefined)
                } catch (err) {
                    this.setState({
                        isLoading: false,
                        error: err.toString()
                    })
                    reject(err)
                }
            })
        })
    }

    @autobind
    onRefreshClick(e: React.SyntheticEvent<HTMLElement>) {
        e.preventDefault()

        this.refreshItems()
    }

    @autobind
    onAutorefreshClick(e: React.SyntheticEvent<HTMLElement>) {
        e.preventDefault()

        this.setState({
            autorefreshEnabled: !this.state.autorefreshEnabled
        })
    }

    componentDidUpdate() {
        if (this.state.autorefreshEnabled && !this.autorefreshRunning) {
            this.startAutorefresh()
        }
    }

    @autobind
    async startAutorefresh() {
        this.autorefreshRunning = true
        let errorCount = 0

        while (this.state.autorefreshEnabled) {
            try {
                await this.refreshItems()
                errorCount = 0
            } catch (err) {
                errorCount++
                await sleep(1000 * errorCount)
            }
        }
        this.autorefreshRunning = false
    }

    render() {
        const { stories, isLoading, autorefreshEnabled, error, lastUpdateAt } = this.state

        return (
            <Container
                className="App"
                text
            >
                <Header
                    size="huge"
                    icon="trophy"
                    content="Top 10 Newcomers"
                />
                <div className="App_header">
                    <Button.Group
                        size="small"
                    >
                        <Button
                            content="Refresh Newcomers"
                            onClick={this.onRefreshClick}
                            disabled={isLoading || autorefreshEnabled}
                            loading={isLoading}
                            className="App_header_updateButton"
                            size="medium"
                            primary
                        />
                        <Button.Or />
                        <Button
                            content="Autorefresh"
                            icon={autorefreshEnabled ? 'toggle on' : 'toggle off'}
                            active={autorefreshEnabled}
                            onClick={this.onAutorefreshClick}
                        />
                    </Button.Group>
                    <span
                        className="App_header_errorMessage"
                        title={error}
                    >
                        {error}
                    </span>
                    <span className="App_header_updatedAt">
                        <span>Last updated: </span>
                        {lastUpdateAt ? <ReactTimeago date={lastUpdateAt} /> : 'never'}
                    </span>
                </div>
                <StoryList stories={stories} />
            </Container>
        )
    }
}