import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import ListBooks from './components/Book/listBook';
import ImportBook from './components/Book/importBook';
import ExportBook from './components/Book/exportBook';
import ListUsers from './components/User/listUser';
import SignUp from './components/User/signUp';
import SignUpForAdmin from './components/Admin/signUpForAdmin';
import ChangeInformationAdmin from './components/Admin/changeInformationAdmin';
import BorrowBooks from './components/User/borrowBooks';
import HandelBookRequest from './components/Book/handleBookRequest';
import ListUserRent from './components/Book/listUserRent';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css"
import '.'
//import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();




const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    display: "",
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Dashboard
            </Menu.Item>
            <SubMenu key="admin" icon={<UserOutlined />} title="Admin">
              <Menu.Item key="createNewAdmin" onClick={() => {this.setState({display : "createNewAdmin"})}}>Đăng ký quản lý</Menu.Item>
              <Menu.Item key="changeInformationAdmin" onClick={() => {this.setState({display : "changeInformationAdmin"})}}>Thay đổi thông tin cá nhân</Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="createNewUser" onClick={() => {this.setState({display : "createNewUser"})}}>Đăng ký người dùng</Menu.Item>
              <Menu.Item key="lock/unlockUser" onClick={() => {this.setState({display : "lock/unlockUser"})}}>Khóa/Mở khóa người dùng</Menu.Item>
              <Menu.Item key="borrowBooks" onClick={() => {this.setState({display : "borrowBooks"})}}>Đăng ký mượn sách</Menu.Item>
            </SubMenu>
            
            <SubMenu key="book" icon={<UserOutlined />} title="Book Management" icon={<PieChartOutlined />}>
              <Menu.Item key="showListBook" onClick={() => {this.setState({display : "showListBook"})}}>Thông tin kiểu sách đang có</Menu.Item>
              <Menu.Item key="ImportBook" onClick={() => {this.setState({display : "ImportBook"})}}>Nhập kho</Menu.Item>
              <Menu.Item key="ExportBook" onClick={() => {this.setState({display : "ExportBook"})}}>Xuất kho</Menu.Item>
              {/* <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item> * */}
            </SubMenu>

            <SubMenu key="rent" icon={<UserOutlined />} title="Rental Book Management" icon={<PieChartOutlined />}>
              <Menu.Item key="borrowBooks" onClick={() => {this.setState({display : "borrowBooks"})}}>Thuê sách</Menu.Item>
              <Menu.Item key="ListUserRent" onClick={() => {this.setState({display : "ListUserRent"})}}>Sách đang thuê</Menu.Item>
              <Menu.Item key="" onClick={() => {this.setState({display : ""})}}>Xuất kho</Menu.Item>
              {/* <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item> * */}
            </SubMenu>

 
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
    

              {/*<Breadcrumb.Item>Loại sách có trong kho</Breadcrumb.Item>*/}
              {this.state.display === "createNewAdmin" ? <SignUpForAdmin/>: ""}
              {this.state.display === "changeInformationAdmin" ? <ChangeInformationAdmin/>: ""}
              {this.state.display === "createNewUser" ? <SignUp/>: ""}
              {this.state.display === "lock/unlockUser" ? <ListUsers/>: ""}
              {this.state.display === "borrowBooks" ? <BorrowBooks/>: ""}
              {this.state.display === "showListBook" ? <ListBooks/>: ""}
              {this.state.display === "ImportBook" ? <ImportBook/>: ""}
              {this.state.display === "ExportBook" ? <ExportBook/>: ""}
              {this.state.display === "ListUserRent" ? <ListUserRent/>: ""}
            </Breadcrumb>
            {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Giao diện tại đây
            </div> */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Quản lý thư viện</Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, document.getElementById('root'));