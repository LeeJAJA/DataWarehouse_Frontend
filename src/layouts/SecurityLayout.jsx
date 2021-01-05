import React from 'react'
import { PageLoading } from '@ant-design/pro-layout'
import { Redirect, connect } from 'umi'
import { stringify } from 'querystring'

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    this.setState({
      isReady: true,
    })
    const { dispatch } = this.props
  }

  render() {
    const { isReady } = this.state
    const { children } = this.props // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    if (!isReady) {
      return <PageLoading />
    }

    return children
  }
}

export default SecurityLayout
