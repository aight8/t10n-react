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
        const { id, title, author, points, totalComments, createdAt, growthRate } = this.props.story
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
                    Total comments: {totalComments} -
                    Created: <ReactTimeago date={createdAt * 1000} /> -
                    Growth rate: {growthRate} points/s
                    </div>
                </div>
            </div>
        )
    }
}
