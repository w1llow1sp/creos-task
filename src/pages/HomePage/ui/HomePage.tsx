import CommentsList from "../../../components/CommentList/CommentList";
import TopDesigners from "../../../components/TopDesigners/TopDesigners";
import {Col, Row} from "antd";


const HomePage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <CommentsList />
                </Col>
                <Col span={12}>
                    <TopDesigners />
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;

