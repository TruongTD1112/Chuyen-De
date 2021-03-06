import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {notification } from 'antd';
import ListBooks from './components/Book/listBook';
import ImportBook from './components/Book/importBook';
import ExportBook from './components/Book/exportBook';
import ListUsers from './components/User/listUser';
import SignUp from './components/User/signUp';
import SignUpForAdmin from './components/Admin/signUpForAdmin';
import ChangeInformationAdmin from './components/Admin/changeInformationAdmin';
import BorrowBooks from './components/User/borrowBooks';
import HandleBookRequest from './components/Book/handleBookRequest';
import ListUserRent from './components/Book/listUserRent';
import Login from "./components/Admin/login";
import WelcomePage from "./components/Admin/welcomePage";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css"
import '.'
import { getCookieByName } from './utils/cookieHandler';
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
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      display: "",
      disabled: true,
    };

    this.login = this.login.bind(this);
  }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  userAccess = () => {
    return this.state.disabled;
  }

  login = () => {
    var email = getCookieByName("Email");
    if (email !== "" && email !== undefined) {
      this.setState({disabled : false, display : "welcome"});
    };
  }

  logout = () => {
    document.cookie = "Email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "Name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    notification.success({message : "B???n ???? ????ng xu???t th??nh c??ng"});
    this.setState({display : "login", disabled : true});
  }

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
            <SubMenu key="session" icon={<UserOutlined/>} title="Phi??n l??m vi???c">
              <Menu.Item hidden={!this.userAccess()} key="login" onClick={() => {this.setState({display : "login"});}}>????ng nh???p</Menu.Item>
              <Menu.Item hidden={this.userAccess()} key="logout" onClick={() => this.logout()}>????ng xu???t</Menu.Item>
            </SubMenu>
            <SubMenu hidden={this.userAccess()} key="admin" icon={<UserOutlined />} title="Admin">
              <Menu.Item key="createNewAdmin" path="admin/signUp" onClick={() => {this.setState({display : "createNewAdmin"})}}>????ng k?? qu???n l??</Menu.Item>
              <Menu.Item key="changeInformationAdmin" onClick={() => {this.setState({display : "changeInformationAdmin"})}}>Thay ?????i th??ng tin c?? nh??n</Menu.Item>
            </SubMenu>
            <SubMenu hidden={this.userAccess()} key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="createNewUser" onClick={() => {this.setState({display : "createNewUser"})}}>????ng k?? ng?????i d??ng</Menu.Item>
              <Menu.Item key="lock/unlockUser" onClick={() => {this.setState({display : "lock/unlockUser"})}}>Kh??a/M??? kh??a ng?????i d??ng</Menu.Item>
          
            </SubMenu>
            
            <SubMenu hidden={this.userAccess()} key="book" icon={<UserOutlined />} title="Book Management" icon={<PieChartOutlined />}>
              <Menu.Item key="showListBook" onClick={() => {this.setState({display : "showListBook"})}}>Th??ng tin ki???u s??ch ??ang c??</Menu.Item>
              <Menu.Item key="ImportBook" onClick={() => {this.setState({display : "ImportBook"})}}>Nh???p kho</Menu.Item>
              <Menu.Item key="ExportBook" onClick={() => {this.setState({display : "ExportBook"})}}>Xu???t kho</Menu.Item>
              {/* <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item> * */}
            </SubMenu>

            <SubMenu hidden={this.userAccess()} key="rent" icon={<UserOutlined />} title="Rental Book Management" icon={<PieChartOutlined />}>
              <Menu.Item key="borrowBooks" onClick={() => {this.setState({display : "borrowBooks"})}}>Thu?? s??ch</Menu.Item>
              <Menu.Item key="ListUserRent" onClick={() => {this.setState({display : "ListUserRent"})}}>S??ch ??ang thu??</Menu.Item>
              <Menu.Item key="HandelBookRequest" onClick={() => {this.setState({display : "HandelBookRequest"})}}>S??ch ??ang ch??? thu??</Menu.Item>
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
    

              {/*<Breadcrumb.Item>Lo???i s??ch c?? trong kho</Breadcrumb.Item>*/}
              {this.state.display === "createNewAdmin" ? <SignUpForAdmin/>: ""}
              {this.state.display === "changeInformationAdmin" ? <ChangeInformationAdmin/>: ""}
              {this.state.display === "createNewUser" ? <SignUp/>: ""}
              {this.state.display === "lock/unlockUser" ? <ListUsers/>: ""}
              {this.state.display === "borrowBooks" ? <BorrowBooks/>: ""}
              {this.state.display === "showListBook" ? <ListBooks/>: ""}
              {this.state.display === "ImportBook" ? <ImportBook/>: ""}
              {this.state.display === "ExportBook" ? <ExportBook/>: ""}
              {this.state.display === "ListUserRent" ? <ListUserRent/>: ""}
              {this.state.display === "HandelBookRequest" ? <HandleBookRequest/>: ""}
              {this.state.display === "login" ? <Login login={this.login}/>: ""}
              {this.state.display === "welcome" ? <WelcomePage/>: ""}
            </Breadcrumb>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Qu???n l?? th?? vi???n</Footer>
        </Layout>
      </Layout>
    );
  }
}

ReactDOM.render(<SiderDemo />, document.getElementById('root'));