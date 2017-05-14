import './style.scss'

import * as React from 'react'
import autobind from 'autobind-decorator'
import * as SeamlessImmutable from 'seamless-immutable'
import StoryList from './components/story-list'
import IStory from './interface/IStory'
import ServerAPI from './api/ServerAPI'
import ReactTimeago from 'react-timeago'

export interface Props {

}

export interface State {
    stories: IStory[]
    lastUpdateAt: number | null
    isLoading: boolean
}

export default class App extends React.Component<Props, State> {
    constructor() {
        super()

        this.state = {
            stories: [],
            lastUpdateAt: null,
            isLoading: false
        }
    }

    componentDidMount() {
        this.refreshItems()
    }

    @autobind
    refreshItems() {
        this.setState({
            isLoading: true
        }, async () => {
            try {
                const stories = await ServerAPI.fetchNewcomers()

                this.setState({
                    stories,
                    lastUpdateAt: Date.now(),
                    isLoading: false
                })
            } catch (err) {
                this.setState({
                    isLoading: false
                })
            }
        })
    }

    @autobind
    onRefreshList(e: React.SyntheticEvent<HTMLElement>) {
        e.preventDefault()
        this.refreshItems()
    }

    render() {
        return (
            <div>
                <h1>Top 10 Newcomers</h1>
                <input
                    type="button"
                    value="Refresh list"
                    onClick={this.onRefreshList}
                    disabled={this.state.isLoading}
                />
                Last update: <ReactTimeago date={this.state.lastUpdateAt} />
                <StoryList stories={this.state.stories} />
            </div>
        )
    }
}