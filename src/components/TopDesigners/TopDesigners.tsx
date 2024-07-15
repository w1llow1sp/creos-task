import  { useEffect, useState } from 'react';
import {List, Avatar, Card} from 'antd';
import dayjs from 'dayjs';
import {IDesigner} from "../../app/api/designer/designer";
import {fetchDesigners} from "../../app/api/designer/designerApi";
import {calculateMedian} from "../../utils/calculateMedian";

const TopDesigners: React.FC = () => {
    const [designers, setDesigners] = useState<IDesigner[]>([]);

    useEffect(() => {
        const getDesigners = async () => {
            const data = await fetchDesigners();
            const topDesigners = data.map((designer: IDesigner) => {
                const doneIssues = designer.issues.filter(issue => issue.status === 'Done');
                const times = doneIssues.map(issue => dayjs(issue.date_created).diff(dayjs(issue.date_created), 'hour'));
                const medianTime = calculateMedian(times);
                return {
                    ...designer,
                    medianTime,
                    tasksCompleted: doneIssues.length
                };
            }).sort((a, b) => a.medianTime - b.medianTime || b.tasksCompleted - a.tasksCompleted).slice(0, 10);
            setDesigners(topDesigners);
        };
        getDesigners();
    }, []);

    return (
        <Card title="Top Designers" bordered={false}>
            <List
                itemLayout="horizontal"
                dataSource={designers}
                renderItem={(designer) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={designer.thumbnails.avatar} />}
                            title={designer.username}
                            description={
                                <>
                                    <div>{`Median time: ${designer.medianTime} hours`}</div>
                                    <div>{`Tasks completed: ${designer.tasksCompleted}`}</div>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default TopDesigners;
