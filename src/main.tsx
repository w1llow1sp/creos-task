import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { observer } from 'mobx-react-lite';
import App from './App';
import './index.css';
import themeStore from "./app/store/themeStore";
import './i18n.ts'

const Root = observer(() => (
    <ConfigProvider theme={themeStore.theme}>
        <App />
    </ConfigProvider>
));

ReactDOM.render(<Root />, document.getElementById('root'));

