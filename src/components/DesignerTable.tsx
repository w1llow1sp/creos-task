import React, { useEffect, useState } from 'react';
import { Table, Avatar, Input, Select } from 'antd';
import {IDesigner} from "../app/api/designer/designer";
import {fetchDesigners} from "../app/api/designer/designerApi";


const { Search } = Input;
const { Option } = Select;

const DesignerTable: React.FC = () => {
    const [designers, setDesigners] = useState<IDesigner[]>([]);
    const [filteredDesigners, setFilteredDesigners] = useState<IDesigner[]>([]);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [projectFilter, setProjectFilter] = useState<string | null>(null);

    useEffect(() => {
        const getDesigners = async () => {
            const data = await fetchDesigners();
            if (Array.isArray(data)) {
                setDesigners(data);
                setFilteredDesigners(data);
            } else {
                console.error('Expected array but got:', data);
            }
        };
        getDesigners();
    }, []);

    const handleSearch = (value: string) => {
        const filtered = designers.filter(designer =>
            designer.username.toLowerCase().includes(value.toLowerCase()) ||
            designer.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDesigners(filtered);
    };

    const handleStatusFilter = (value: string | null) => {
        setStatusFilter(value);
        filterDesigners(value);
    };


    const filterDesigners = (status: string | null) => {
        let filtered = designers;
        if (status) {
            filtered = filtered.filter(designer => designer.issues.some(issue => issue.status === status));
        }
        setFilteredDesigners(filtered);
    };

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text: string, record: IDesigner) => (
                <Avatar src={record.thumbnails.avatar} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
            sorter: (a: IDesigner, b: IDesigner) => a.username.localeCompare(b.username),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: IDesigner, b: IDesigner) => a.email.localeCompare(b.email),
        },
        {
            title: 'Tasks Completed',
            dataIndex: 'tasksCompleted',
            key: 'tasksCompleted',
            render: (text: string, record: IDesigner) => (
                record.issues.filter(issue => issue.status === 'Done').length
            ),
        },
        {
            title: 'Tasks In Progress',
            dataIndex: 'tasksInProgress',
            key: 'tasksInProgress',
            render: (text: string, record: IDesigner) => (
                record.issues.filter(issue => issue.status === 'In Progress').length
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Search
                    placeholder="Search by name or email"
                    onSearch={handleSearch}
                    style={{ width: 200, marginRight: 16 }}
                />
                <Select
                    placeholder="Filter by status"
                    onChange={value => handleStatusFilter(value)}
                    allowClear
                    style={{ width: 200 }}
                >
                    <Option value="Done">Done</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="New">New</Option>
                </Select>
            </div>
            <Table
                columns={columns}
                dataSource={filteredDesigners}
                rowKey="username"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default DesignerTable;

