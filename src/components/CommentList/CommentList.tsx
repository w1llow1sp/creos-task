import { useEffect, useState } from 'react';
import {List, Avatar, Card} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {ICommenetType} from "../../app/api/comment/type";
import {fetchComments} from "../../app/api/comment/commentApi";

dayjs.extend(relativeTime);

const CommentsList: React.FC = () => {
    const [comments, setComments] = useState<ICommenetType[]>([]);

    useEffect(() => {
        const getComments = async () => {
            const data = await fetchComments();
            setComments(data.slice(0, 10)); // Оставляем только 10 комментариев
        };
        getComments();
    }, []);

    const truncateMessage = (message: string, maxLength: number) => {
        if (message.length <= maxLength) {
            return message;
        }
        return message.slice(0, maxLength) + '...';
    };

    return (
        <Card title="Latest Comments" bordered={false} style={{ marginBottom: 20 }}>
            <List
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(comment) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={comment.designer.thumbnails.avatar} />}
                            title={comment.designer.username}
                            description={
                                <>
                                    <div>{dayjs(comment.date_created).fromNow()}</div>
                                    <div>{comment.issue}</div>
                                    <div>{truncateMessage(comment.message,20)}</div>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
            )

};

export default CommentsList;
