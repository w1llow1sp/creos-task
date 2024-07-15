import  { useEffect, useState } from 'react';
import { Select, Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import {Issue} from "../../app/api/issue/issue";
import {fetchTasks} from "../../app/api/issue/issueApi";

dayjs.extend(weekOfYear);

const { Option } = Select;

const TaskChart: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [weeks, setWeeks] = useState<number[]>([]);

    useEffect(() => {
        const getIssues = async () => {
            const data = await fetchTasks();
            if (Array.isArray(data)) {
                setIssues(data);
                const lastEightWeeks = Array.from({ length: 8 }, (_, i) => dayjs().week() - i).reverse();
                setWeeks(lastEightWeeks);
            } else {
                console.error('Expected array but got:', data);
            }
        };
        getIssues();
    }, []);

    const handleWeekChange = (value: number[]) => {
        setWeeks(value);
    };

    const calculateData = () => {
        const weekData = weeks.map(week => {
            const weekIssues = issues.filter(issue => dayjs(issue.date_finished).week() === week);
            const profit = weekIssues.reduce((sum, issue) => sum + issue.received_from_client, 0);
            const expenses = weekIssues.reduce((sum, issue) => sum + issue.send_to_project_manager + issue.send_to_account_manager + issue.send_to_designer, 0);
            return {
                week,
                profit,
                expenses,
                difference: profit - expenses
            };
        });
        return weekData;
    };

    const data = calculateData();

    return (
        <Card title="Tasks Closed Per Week" bordered={false} style={{ marginBottom: 20 }}>
            <Select
                mode="multiple"
                style={{ width: '100%', marginBottom: 20 }}
                placeholder="Select weeks"
                defaultValue={weeks}
                onChange={handleWeekChange}
            >
                {Array.from({ length: 52 }, (_, i) => (
                    <Option key={i} value={i + 1}>{`Week ${i + 1}`}</Option>
                ))}
            </Select>
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
                <Line type="monotone" dataKey="difference" stroke="#ffc658" />
            </LineChart>
        </Card>
    );
};

export default TaskChart;
