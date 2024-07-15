
import { Row, Col } from 'antd';
import TaskChart from "../../components/TaskChart/TaskChart";
import TaskPieChart from "../../components/TaskChart/TaskPieChart.";

const TasksPage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <TaskChart />
                </Col>
                <Col span={12}>
                    <TaskPieChart />
                </Col>
            </Row>
        </div>
    );
};

export default TasksPage;
