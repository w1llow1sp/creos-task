
import './App.css'
import {observer} from "mobx-react-lite";
import {Layout} from "antd";
import AppHeader from "./components/Header/Header";
import HomePage from "./pages/HomePage/ui/HomePage";


const App: React.FC = observer(() => {
    return (
        <Layout style={{ height: '100vh' }}>
            <AppHeader />
            <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
                <HomePage/>
            </Layout.Content>
        </Layout>
    );
});

export default App;


