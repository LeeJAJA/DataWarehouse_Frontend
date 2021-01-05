import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, SelectLang, useIntl, connect } from 'umi'
import React from 'react'
import logo from '../assets/logo.svg'
import styles from './UserLayout.less'
import './Layout.css'

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props
  const { routes = [] } = route
  const {
    children,
    location = {
      pathname: '',
    },
  } = props
  // const {} = useIntl();
  const { breadcrumb } = getMenuData(routes)
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  })
  return (
    <HelmetProvider>
      <Helmet>
        <title>{"Octopus 电影信息平台"}</title>
        <meta name='description' content={"Octopus 电影信息平台"} />
      </Helmet>
      <body>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div id='container'>
                <p>
                  <a>OCTOPUS-MOVIES</a>
                </p>
              </div>
            </div>
            {children}
          </div>
          {/* <DefaultFooter copyright={`${new Date().getFullYear()} 同济大学软件学院`} /> */}
        </div>
      </body>
    </HelmetProvider>
  )
}

export default connect(({ settings }) => ({ ...settings }))(UserLayout)
