import React from 'react'
import { Table, Tag } from 'antd'
import styles from './index.less'
import { Link, connect, history, FormattedMessage, formatMessage } from 'umi';


const mapStateToProps = ({ movie, loading }) => ({
  currentTab: movie.currentTab,
  movieList: {tab1:movie.movieList1, tab2:movie.movieList2, tab3:movie.movieList3, tab4:movie.movieList4},
  submitting: loading.effects['movie/onTabChange'],
});

const columns = {
  
  tab1: 
  [
  {
    title: '名称',
    dataIndex: 'movieName',
    key: 'movieName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '发行时间',
    dataIndex: 'publishYear',
    key: 'publishYear',
  },
  {
    title: '评分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '导演',
    dataIndex: 'directorList',
    key: 'directorList',
    render: (list) => <a>{list[0].name}</a>,
  },
  {
    title: '主演',
    dataIndex: 'actorList',
    key: 'actorList',
    render: (list) => <a>{list[0].name}</a>,
  },
  {
    title: '类型',
    key: 'tags',
    dataIndex: 'genreList',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'

          if (tag === 'loser') {
            color = 'volcano'
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (item) => (
      <span>
        <a
          style={{
            marginRight: 16,
          }}
          href={"https://amazon.com/dp/"+item.pid}
        >
          View Details
        </a>
      </span>
    ),
  },
],
tab2: 
  [
  {
    title: '名称',
    dataIndex: 'movieName',
    key: 'movieName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '发行时间',
    dataIndex: 'publishYear',
    key: 'publishYear',
  },
  {
    title: '评分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '操作',
    key: 'action',
    render: (item) => (
      <span>
        <a
          style={{
            marginRight: 16,
          }}
          href={"https://amazon.com/dp/"+item.pid}
        >
          View Details
        </a>
      </span>
    ),
  },
],
tab3: 
  [
  {
    title: '用户名',
    dataIndex: 'profileName',
    key: 'profileName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '评论概要',
    dataIndex: 'summary',
    key: 'summary',
  },
  {
    title: '用户评分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '情感分析',
    dataIndex: 'random',
    key: 'random',
  },
  {
    title: '加权分',
    dataIndex: 'avg',
    key: 'avg',
  },
  // {
  //   title: '操作',
  //   key: 'action',
  //   render: (item) => (
  //     <span>
  //       <a
  //         style={{
  //           marginRight: 16,
  //         }}
  //         href={"https://amazon.com/dp/"+item.pid}
  //       >
  //         View Details
  //       </a>
  //     </span>
  //   ),
  // },
],
tab4: 
  [
  {
    title: '合伙人一',
    dataIndex: 'person1',
    key: 'person1',
    render:(person) => person.isActor ? <a>{person.personName+"(Actor)"}</a> : <a>{person.personName+"(Director)"}</a>,
  },
  {
    title: '合伙人二',
    dataIndex: 'person2',
    key: 'person2',
    render:(person) => person.isActor ? <a>{person.personName+"(Actor)"}</a> : <a>{person.personName+"(Director)"}</a>,
  },
  {
    title: '合作次数',
    dataIndex: 'countOfCooperations',
    key: 'countOfCooperations',
  },
]


}


export default connect(mapStateToProps)(({currentTab, movieList}) => (
  <div className={styles.container}>
    <div id='components-table-demo-basic'>
      <Table columns={columns[currentTab]} dataSource={movieList[currentTab]} />
    </div>
  </div>
))
