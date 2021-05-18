import React, {useEffect, useState} from 'react';
import bookApi from '../../api/bookApi';
import {Table, Button, Space, Popconfirm} from 'antd';
function ExportBook (){
    // const onClick = () => {
    //     list = [];
    //     bookApi.exportBook(list);
    // }
    const [hasSelected, setHasSelected] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    //const [dataEachRow, setDataEachRow] = useState([]);
    const [dataEachRow, setdataEachRow] = useState([]);
    const columnsEachRow = [
        {
            title: "Mã từng cuốn sách",
            dataIndex: "_id",
            key: "idEachBook",
            //sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "Tình trạng sử dụng",
            dataIndex: "status",
            key: "status"
        },
        {
            title: "Người thuê",
            dataIndex: "user",
            key: "user"
        },
        {
            title: "Hành động",
            dataIndex: "",
            // render: (record) => (
            //     <Space>
            //         <a onClick = {() => {
            //             bookApi.exportBook({"bookId" : record._id})
            //         }}>Delete</a>
            //     </Space>
            // ),
            render: (record) => (
                  <Popconfirm title="Sure to delete?" onConfirm = {(e) => handleDelete(record, record.key)}>
                    <a>Delete</a>
                  </Popconfirm>
            ) 
        },
    ]

    const columns = [
        {
            title: "Tên sách",
            dataIndex: "title",
            key: "title",
            //sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
            //sorter: (a, b) => a.description.length - b.description.length,
        },
        {
            title: "Thể loại",
            dataIndex: "genre",
            key: "genre",
            //sorter: (a, b) => a.typeName.length - b.typeName.length,
        },
        {
            title: "Mã sách",
            dataIndex: "code",
            key: "code",
            //sorter: (a, b) => a.typeName.length - b.typeName.length
        },
        {
          title: "Số lượng",
          dataIndex: "amount",
          key: "amount",
          //sorter: (a, b) => a.description.length - b.description.length,
      },
    ]

    const handleDelete = async (record, key) => {
      var index  = record.index;
      console.log(index);
      await bookApi.exportBook({"bookId" : record._id});
      var res = dataEachRow;
      // for(let i = 0; i< res.length; i++){
      //   for(let j = 0; j< res[i].length; j++){
      //     if(res[i][j] === record){
      //       res.splice(j, 1);
      //     }
      //   }
      // }
      var index1 = res[index].indexOf(record);
      console.log(index1);
      res[index].splice(index1, 1)
      console.log(res);
      setdataEachRow([...res]);
    }


    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000)
    };

    const onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
      if(selectedRowKeys.length > 0) setHasSelected(true);
      else setHasSelected(false);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    // var hasSelected = false;
    // useEffect(() => {
    //     hasSelected = (selectedRowKeys.length > 0);
    // }, [selectedRowKeys])

    const submit = async() => {
        let data =  selectedRowKeys.map((item) => {
           return item._id;
        })
        try{
           await bookApi.exportBook({"listBookExport" : data});
        }
        catch(err) {
          console.log(err);
        }
    }
    const getData = async () => {
        let res = await bookApi.getListAllBooks();
        //console.log(res);
        let resData = res.map((item, index) => {
          const listBook = item.listBook;

          return {
            ...item, 
            key: item._id
            // type: item.type._id,
            // typeName: item.type.name,
            // key: index,
          };
        });
        //console.log(res);
        setData(resData);

        var resIDEachRow =  res.map((item) => {
            return item.listBook;
        });
        console.log(resIDEachRow);
        var resDataEachRow = [];
        for(let i = 0; i< resIDEachRow.length; i++){
            let responseData = await bookApi.getByListID({"list_id" : resIDEachRow[i]});
            let result = responseData.map((item) => {
              return {
                ...item,
                key: item._id,
                index: i
              }
            })
            resDataEachRow.push(result);
        }
        //console.log(resDataEachRow);
        
        setdataEachRow(resDataEachRow);
        // if (res.photo) setImageUrl(res.photo);
        // setData(resData);
    };
    useEffect(async () => {
      // setData(fakeData);
      await getData();
    }, []);

    const expandableTable = {   

            expandedRowRender: async (record) => (
              <Table {...expandableTable} columns={columns} dataSource={data} />
            )
          };
    return(
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} books` : ''}
          </span>
        </div>
        <Table
          columns={columns}
          //{...expandableTable}
          expandable={{
            expandedRowRender:  (record, index)=> {
                return <Table 
                    columns = {columnsEachRow}
                    dataSource = {dataEachRow[index]}/>
            //     const dataEachRow = await bookApi.getByListID({"list_id" : record.listBook});
            //     //console.log(dataEachRow);
            // return (
            //  <Table  
            //     columns= {columnsEachRow} 
            //     dataSource = {dataEachRow}
            //  />
            // )
            // // console.log(record.author);
            // //  return (<p>{record.author}</p>)
            // }
            // rowExpandable: record => record.expandable
            }}}
          dataSource={data}
        />
      </div>
    )
        }



class SubTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataEachRow : props.dataEachRow
    }
  }
  render(){
    const columnsEachRow = [
      {
          title: "Mã từng cuốn sách",
          dataIndex: "_id",
          key: "idEachBook",
          //sorter: (a, b) => a.name.length - b.name.length
      },
      {
          title: "Tình trạng sử dụng",
          dataIndex: "status",
          key: "status"
      },
      {
          title: "Người thuê",
          dataIndex: "user",
          key: "user"
      },
      {
          title: "Hành động",
          dataIndex: "",
          // render: (record) => (
          //     <Space>
          //         <a onClick = {() => {
          //             bookApi.exportBook({"bookId" : record._id})
          //         }}>Delete</a>
          //     </Space>
          // ),
          render: (record) => (
                <Popconfirm title="Sure to delete?" onConfirm = {(e) => handleDelete(record, record.key)}>
                  <a>Delete</a>
                </Popconfirm>
          ) 
      },
  ]
  const handleDelete = async (record, key) => {
    console.log(this.state.dataEachRow);
    var index  = record.index;
    console.log(record);
    await bookApi.exportBook({"bookId" : record._id});
    var res = [...this.state.dataEachRow];
    for(let i = 0; i< res.length; i++){
      for(let j = 0; j< res[i].length; j++){
        if(res[i][j].key === key){
          res.splice(j, 1);
        }
      }
    }
    console.log(res);
    this.setState({dataEachRow: res});
  }
  var dataEachRow = [...this.state.dataEachRow];
  return (
    <Table dataSource = {[dataEachRow]} colums = {columnsEachRow}/>
  )
  }
}
export default ExportBook;