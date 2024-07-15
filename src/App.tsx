import './App.css'
import {observer} from "mobx-react-lite";
import {Layout} from "antd";
import AppHeader from "./components/Header/Header";
import HomePage from "./pages/HomePage/ui/HomePage";
import TasksPage from "./pages/TaskPage/TaskPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DesignerPage from "./pages/DesignerPage/DesignersPage";


const App: React.FC = observer(() => {
    return (
        <Router>
            <Layout style={{height: '100vh'}}>
                <AppHeader/>
                <Layout.Content style={{padding: '0 50px', marginTop: 64}}>
                    <HomePage/>
                    <TasksPage/>
                    <DesignerPage/>
                </Layout.Content>
            </Layout>
        </Router>
    );
});

export default App;


