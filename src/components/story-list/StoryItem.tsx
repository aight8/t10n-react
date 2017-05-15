import * as React from 'react'
import ReactTimeago from 'react-timeago'
import IStory from 'interface/IStory'
import { List } from 'semantic-ui-react'

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
            <List.Item className="StoryList_item">
                <List.Content
                    floated="left"
                    className="StoryList_item_rank"
                >
                    {rank}
                </List.Content>
                <List.Content
                    floated="left"
                    className="StoryList_item_content"
                >
                    <List.Header className="StoryList_item_content_title">{title}</List.Header>
                    <div className="StoryList_item_content_properties">
                        <span>ID: {id}</span>
                        <span>Points: {points}</span>
                        <span>Author: {author}</span>
                        <span>Total comments: {total_comments}</span>
                        <span>Created at: <ReactTimeago date={created_at * 1000} /></span>
                    </div>
                </List.Content>
            </List.Item>
        )
    }
}
