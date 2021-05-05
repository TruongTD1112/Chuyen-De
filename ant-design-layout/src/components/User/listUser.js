import React, {useEffect, useState} from "react";

import {
    Table, Button
} from "antd";

import adminApi from '../../api/adminApi';

function ListUsers(props) {

    const [data, setData] = useState([]);

    // Data: Email - firstName - lastName - birthday - class - status
    const columns = [
        {
            title : "STT",
            dataIndex : "index",
            key : "index",
            maxWidth: 20,
            filterable: false,
            Cell: (row) => {
                return <div>{row.id}</div>;
            }
        },
        {
            title : "Email",
            dataIndex : "email",
            key : "email",
        },
        {
            title : "Họ và tên đệm",
            dataIndex : "firstName",
            key : "firstName",
        },
        {
            title : "Tên",
            dataIndex : "lastName",
            key : "lastName",
        },
        {
            title : "Ngày sinh",
            dataIndex : "birthday",
            key : "birthday",
        },
        {
            title : "Lớp",
            dataIndex : "class",
            key : "class",
        },
        {
            title : "Trạng thái",
            dataIndex : "status",
            key : "status",
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            width: '150px',
            render: (_, record) => (
              <>
                {record.status === 'active' && <Button shape="retangle" type="danger" block="true" onClick={() => lockUser(record)}>Khóa tài khoản</Button>}
                {record.status === 'locked' && <Button shape="retangle" type="primary" block="true" onClick={() => unlockUser(record)}>Mở khóa tài khoản</Button>}
              </>
            )
        }
    ]

    

    const getData = async () => {
        let res = await adminApi.getListAllUsers();
        //console.log(res);
        let id = 1;
        let resData = res.map((item, index) => {
          return {
            index : id++,
            ...item
          };
        });
        //console.log(res);
        setData(resData);
    };

    useEffect(async () => {
        await getData()
    }, []);

    const lockUser = (record) => {
        adminApi.lockUser(record.email);
        const new_data = data.slice();
        new_data[record.index - 1].status = 'locked';
        new_data[record.index - 1].action =  <Button shape="retangle" type="primary" block="true" onClick={() => unlockUser(new_data[record.index - 1])}>Mở khóa tài khoản</Button>;
        setData(new_data);
    }

    const unlockUser = (record) => {
        adminApi.unlockUser(record.email);
        const new_data = data.slice();
        new_data[record.index - 1].status = 'active';
        new_data[record.index - 1].action =  <Button shape="retangle" type="danger" block="true" onClick={() => lockUser(new_data[record.index - 1])}>Khóa tài khoản</Button>;
        setData(new_data);
    };

    return(
        <Table
          columns={columns}
          dataSource={data}
        />
    )

}

export default ListUsers;