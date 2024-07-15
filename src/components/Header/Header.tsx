import { Layout, Switch, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import themeStore from "../../app/store/themeStore";
import localeStore from "../../app/store/localeStore";
import {values} from "mobx";

dayjs.extend(weekOfYear);

const { Header } = Layout;
const { Option } = Select;

/**
 * Конфигурирует сервер разработки для использования с webpack.
 *
 *
 * @param {propsName} options -
 * @returns {type of any}
 *  - ``:
 */

const AppHeader: React.FC = observer(() => {
    const {t,i18n} = useTranslation();
    const currentWeek = dayjs().subtract(11, 'hours').week();

    const handleThemeChange = (checked: boolean) => {
        themeStore.toggleTheme();
    };

    const handleLocaleChange = (value: string) => {
        localeStore.setLocale(value as 'en' | 'ru');
        i18n.changeLanguage(value);
    };

    return (
        <Header
            className="header"
            style={{
                backgroundColor: themeStore.theme === 'light' ? '#fff' : '#333',
                color: themeStore.theme === 'light' ? '#000' : '#fff',
            }}
        >
            <div className="logo">{t('welcome')}</div>
            <div className="actions">
                <span>{t('current_week')}: {currentWeek}</span>
                <Switch
                    checked={themeStore.theme === 'dark'}
                    onChange={handleThemeChange}
                    checkedChildren={t('toggle_theme')}
                    unCheckedChildren={t('toggle_theme')}
                />
                <Select
                    value={localeStore.locale}
                    onChange={(value: 'en' | 'ru') => handleLocaleChange(value)}
                    style={{ width: 120 }}
                >
                    <Option value="en">English</Option>
                    <Option value="ru">Русский</Option>
                </Select>
            </div>
        </Header>
    );
});

export default AppHeader;
