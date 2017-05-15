import * as React from 'react'
import ReactTimeago from 'react-timeago'
import IStory from '../../interface/IStory'

export interface Props {
    rank: number
    story: IStory
}

export interface State {

}

export default class StoryItem extends React.Component<Props, State> {
    render() {
        const { id, title, author, points, total_comments, created_at, growth_rate } = this.props.story
        const rank = this.props.rank

        return (
            <div className="StoryList_item">
                <div className="StoryList_item_rank">{rank}</div>
                <div className="StoryList_item_content">
                    <div className="StoryList_item_content_title">{title}</div>
                    <div className="StoryList_item_content_info">
                        ID: {id} -
                    Points: {points} -
                    Author: {author} -
                    Total comments: {total_comments} -
                    Created: <ReactTimeago date={created_at * 1000} /> -
                    Growth rate: {growth_rate} points/s
                    </div>
                </div>
            </div>
        )
    }
}
