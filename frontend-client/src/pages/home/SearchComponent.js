import React, {useState} from 'react'
import { Input, Space, Card, Row, Col, Select, Pagination } from 'antd';
import BookComponent from './BookComponent'
import './SearchComponent.css'
const { Search } = Input
const { Option } = Select

const SearchComponent = props => {
    const [page, setPage] = useState(0);
    const onSearch = (value) => {
        console.log(value)
    }
    const onChangePage = p => {
        setPage(p)
    }
    const searchResultEx = {
        img: 'https://statics.pancake.vn/web-media/e9/c6/b4/f3/8cb610dafded1452dcfc8792450e2926faef8389b1ed8cc8d767c3b5.jpg',
        name: "Aquamancascsacascasc",
        publishTime: 2019,
        author: "James Wan"
    }
    
    const onClickSearch = () => {
        window.scrollTo({ top: 500, left: 0, behavior: 'smooth' })
    }
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Card title="Tìm kiếm"  bordered={false}>
                
                <Row justify="start" gutter={4}>
                    <Col span={12}>
                    <Search onClick={onClickSearch} placeholder="Tên sách...    " onSearch={onSearch} enterButton style={{borderWidth: 2}} />
                    </Col>
                    <Col span={4} >
                        <Select placeholder="Năm xuất bản" style={{width:'100%'}}>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select placeholder="Tác giả" style={{width:'100%'}} >
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                        </Select>
                    </Col>

                    <Col span={4} >
                        <Select placeholder="Thể loại" style={{width:'100%'}}>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                            <Option value="2019">2019</Option>
                        </Select>

                    </Col>
                </Row>
            </Card>
            <Row justify="start" gutter={{ xs: 8, sm: 16, md: 24 }}>
                
                    <BookComponent  bookInfo={searchResultEx} />
               
                    <BookComponent bookInfo={searchResultEx} />
                
                    <BookComponent bookInfo={searchResultEx} />               

            </Row>
            
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}} >
                <Pagination current={page} onChange={onChangePage} total={20} />
            </div>
            

        </Space>
    )
}

export default SearchComponent