import React, { Fragment } from 'react'
import { Layout } from 'antd';
import BaseLayout from '../../components/BaseLayout'
import Carousel from './Carousel'
import 'antd/dist/antd.css'
import SearchComponent from './SearchComponent'


import './index.css'
const { Header, Content, Footer } = Layout;

const Home = props => {


    return (
        <Fragment>
            <BaseLayout>
                <Content style={{ padding: '0 50px' }}>

                    <div className="site-layout-content">
                        <Carousel />
                        <SearchComponent/>

                    </div>
                </Content>
            </BaseLayout>
        </Fragment>
    )
}

export default Home