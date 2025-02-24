import './AppLayout.less';

import * as React from 'react';

import { Redirect, Switch } from 'react-router-dom';

import DocumentTitle from 'react-document-title';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Layout } from 'antd';
import ProtectedRoute from '../../components/Router/ProtectedRoute';
import SiderMenu from '../../components/SiderMenu';
import { appRouters } from '../Router/router.config';
import utils from '../../utils/utils';

const { Content } = Layout;

class AppLayout extends React.Component<any> {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };

    render() {
        const {
            history,
            location: { pathname },
        } = this.props;

        const { path } = this.props.match;
        const { collapsed } = this.state;

        const layout = (
            <Layout style={{ minHeight: '100vh' }}>
                <SiderMenu path={path} onCollapse={this.onCollapse} history={history} collapsed={collapsed} />
                <Layout>
                    <Layout.Header style={{ background: '#fff', minHeight: 52, padding: 0 }}>
                        <Header collapsed={this.state.collapsed} toggle={this.toggle} />
                    </Layout.Header>
                    <Content style={{ margin: 16 }}>
                        <Switch>
                            {appRouters
                                .filter((item: any) => !item.isLayout)
                                .map((route: any, index: any) => (
                                    <ProtectedRoute key={index} path={route.path} component={route.component} permission={route.permission} />
                                ))}

                            <Redirect from="/" to="/dashboard" />
                        </Switch>
                    </Content>
                    <Layout.Footer style={{ textAlign: 'center' }}>
                        <Footer />
                    </Layout.Footer>
                </Layout>
            </Layout>
        );

        return <DocumentTitle title={utils.getPageTitle(pathname)}>{layout}</DocumentTitle>;
    }
}

export default AppLayout;
