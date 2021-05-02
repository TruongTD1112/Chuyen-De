import React, {useEffect, useState} from "react";

import {
    Table,
} from "antd";

import adminApi from '../../api/adminApi';

function ListUsers(props) {

    const [data, setData] = useState([]);

    // Data: Email - firstName - lastName - birthday - class - status
    const columns = [
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
    ]

    const getData = async () => {
        let res = await adminApi.getListAllUsers();
        //console.log(res);
        let resData = res.map((item, index) => {
          return {
            ...item
          };
        });
        //console.log(res);
        setData(resData);
    };

    useEffect(async () => {
      await getData();
    }, []);

    return(
        <Table
          columns={columns}
          dataSource={data}
        />
    )

}

export default ListUsers;