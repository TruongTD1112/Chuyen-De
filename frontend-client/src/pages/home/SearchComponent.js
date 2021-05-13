import React, {useState} from 'react'
import { Input, Space, Card, Row, Col, Select, Pagination, Button } from 'antd';
import BookComponent from './BookComponent'
import './SearchComponent.css'
import {searchBook} from '../../api/BookManagement'
const { Search } = Input
const { Option } = Select

const SearchComponent = props => {
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [code, setCode] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    const onSearch = async () => {
        try {
            let res = await searchBook(title, genre, author, page, code);
            if (res.status === 200) {
                setSearchRes(res.data)
            }
        }
        catch(error){
            alert("Có lỗi khi tìm kiếm")
        }
    }
    const onChangePage = async p => {
        setPage(p);
        try {
            let res = await searchBook(title, genre, author, p, code);
            if (res.status === 200) {
                setSearchRes(res.data)
            }
        }
        catch(error){
            alert("Có lỗi khi tìm kiếm")
        }
    }

    
    const onClickSearch = () => {
        window.scrollTo({ top: 500, left: 0, behavior: 'smooth' })
    }
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Card title="Tìm kiếm"  bordered={false}>
                
                <Row justify="start" gutter={4}>
                    <Col span={8}>
                    <Input onClick={onClickSearch} placeholder="Tên sách...    " onPressEnter={onSearch}  style={{borderWidth: 2}} onChange={e => setTitle(e.target.value)} />
                    </Col>
                    <Col span={4} >
                        <Input placeholder="Mã sách" onPressEnter={onSearch} onChange={e => setCode(e.target.value)}/>
                        </Col>  
                    <Col span={4}>
                        <Input placeholder="Tác giả" onPressEnter={onSearch} onChange={e => setAuthor(e.target.value)}/>
                    </Col>
                    

                    <Col span={4} >
                        <Select labelInValue  placeholder="Thể loại" style={{width:'100%'}} onChange={e => {setGenre(e.value)}}>
                            <Option value="">Tất cả</Option>
                            <Option value="văn học">Văn học</Option>
                            <Option value="tin học">Tin học</Option>
                            <Option value="toán học">Toán học</Option>
                            <Option value="lịch sử">Lịch sử</Option>
                            <Option value="chính trị">Chính trị</Option>
                            <Option value="dai cuong">Đại Cương</Option>
                        </Select>

                    </Col>
                    <Button type="primary" onClick={onSearch}>Tìm kiếm</Button>
                </Row>
            </Card>
            <Row justify="start" gutter={{ xs: 8, sm: 16, md: 24 }}>
                { searchRes.length >0 &&  searchRes.map((elem, index) => (
                    <BookComponent bookInfo={elem} key={index} />
                ))}
                            

            </Row>
            
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}} >
                <Pagination current={page} onChange={onChangePage} total={20} />
            </div>
            

        </Space>
    )
}

export default SearchComponent