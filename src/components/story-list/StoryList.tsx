import * as React from 'react'
import * as SeamlessImmutable from 'seamless-immutable'
import * as FlipMove from 'react-flip-move'
import IStory from '../../interface/IStory'
import StoryItem from './StoryItem'

export interface Props {
    stories: IStory[]
}

export interface State {

}

export default class StoryList extends React.Component<Props, State> {
    render() {
        const stories = this.props.stories

        let noItemsNode
        let storyNodes

        if (stories.length === 0) {
            noItemsNode = (
                <div className="StoryList_empty">
                    <span>The top 10 list is not loaded.</span>
                </div>
            )
        } else {
            storyNodes = stories.map((story, index) => {
                return (
                    <StoryItem
                        key={story.id}
                        story={story}
                        rank={index + 1}
                    />
                )
            })
        }

        return (
            <div className="StoryList">
                <FlipMove>
                    {noItemsNode}
                    {storyNodes}
                </FlipMove>
            </div>
        )
    }
}
