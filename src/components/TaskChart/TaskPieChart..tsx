import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from 'antd';
import {fetchTasks} from "../../app/api/issue/issueApi";
import {Issue} from "../../app/api/issue/issue";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TaskPieChart: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        const getIssues = async () => {
            const data = await fetchTasks();
            if (Array.isArray(data)) {
                setIssues(data);
            } else {
                console.error('Expected array but got:', data);
            }
        };
        getIssues();
    }, []);

    const calculateData = () => {
        const statusCounts = issues.reduce((acc, issue) => {
            acc[issue.status] = (acc[issue.status] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        return Object.keys(statusCounts).map(status => ({
            name: status,
            value: statusCounts[status],
        }));
    };

    const data = calculateData();

    return (
        <Card title="Task Status Distribution" bordered={false} style={{ marginBottom: 20 }}>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </Card>
    );
};

export default TaskPieChart;
