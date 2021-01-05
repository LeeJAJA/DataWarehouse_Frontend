import {
  Form,
  Button,
  Col,
  Input,
  Popover,
  Progress,
  Row,
  Select,
  Slider,
  Card,
  DatePicker,
} from 'antd';
import React, { useState, useEffect, Component } from 'react';
import { Link, connect, history, FormattedMessage, formatMessage } from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './style.less';
import TableBasic from './TableBasic';
import G6 from '@antv/g6';
const { RangePicker } = DatePicker;

const mapStateToProps = ({ movie, loading }) => ({
  currentTab: movie.currentTab,
  currentTab2: movie.currentTab2,
  movieList1: movie.movieList1,
  submitting: loading.effects['movie/onTabChange'],
});

const FormItem = Form.Item;

class ConditionForm extends Component {
  render() {
    return (
      <Form
        form={form}
        name="UserRegister"
        onFinish={onFinish}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          offset: 2,
          span: 14,
        }}
      >
        <Form.Item name="title" label="电影名称" {...formatConfig}>
          <Input placeholder="全选" />
        </Form.Item>
        <Form.Item name="director" label="导演" {...formatConfig}>
          <Input placeholder="全选" />
        </Form.Item>
        <Form.Item name="leadActor" label="主演" {...formatConfig}>
          <Input placeholder="全选" />
        </Form.Item>
        <Form.Item name="actor" label="演员" {...formatConfig}>
          <Input placeholder="全选" />
        </Form.Item>
        <Form.Item name="genre" label="类别" {...formatConfig}>
          <Input placeholder="全选" />
        </Form.Item>
        <Form.Item name="dateRange" label="发行时间筛选" {...rangeConfig}>
          <RangePicker />
        </Form.Item>
        <Form.Item name="scoreRange" label="评分区间筛选">
          <Slider
            range
            defaultValue={[0.0, 5.0]}
            max={5.0}
            min={0.0}
            step={0.05}
            tooltipPlacement="bottom"
            tooltipVisible
          />
          {/* <SmileOutlined /> */}
        </Form.Item>
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Register = ({ currentTab, currentTab2, movieList1, submitting, dispatch }) => {
  const [form] = Form.useForm(); // useEffect(() => {

  const tabList = [
    {
      key: 'tab1',
      tab: '组合查询',
    },
    {
      key: 'tab2',
      tab: '版本查询',
    },
    {
      key: 'tab3',
      tab: '评价查询',
    },
    {
      key: 'tab4',
      tab: '关联查询',
    },
  ];

  const tabList2 = [
    {
      key: 'tab1',
      tab: '查询结果',
    },
    {
      key: 'tab2',
      tab: '数据血缘',
    },
    {
      key: 'tab3',
      tab: '速度比较',
    },
  ];

  const contentList = {
    tab1: <div><Form.Item name="title" label="电影名称">
    <Input placeholder="全选" />
  </Form.Item>
  <Form.Item name="director" label="导演">
    <Input placeholder="全选" />
  </Form.Item>
  <Form.Item name="leadActor" label="主演">
    <Input placeholder="全选" />
  </Form.Item>
  <Form.Item name="actor" label="演员">
    <Input placeholder="全选" />
  </Form.Item>
  <Form.Item name="genre" label="类别">
    <Input placeholder="全选" />
  </Form.Item>
  <Form.Item name="dateRange" label="发行时间筛选">
    <RangePicker />
  </Form.Item>
  <Form.Item name="scoreRange" label="评分区间筛选">
    <Slider
      range
      defaultValue={[0.0, 5.0]}
      max={5.0}
      min={0.0}
      step={0.05}
      tooltipPlacement="bottom"
      tooltipVisible
    />
    {/* <SmileOutlined /> */}
  </Form.Item>
  <FormItem>
    <Button
      size="large"
      loading={submitting}
      className={styles.submit}
      type="primary"
      htmlType="submit"
    >
      查询
    </Button>
  </FormItem></div>,
    tab2:<div><Form.Item name="title" label="电影名称">
    <Input placeholder="全选" />
  </Form.Item>
  <FormItem>
    <Button
      size="large"
      loading={submitting}
      className={styles.submit}
      type="primary"
      htmlType="submit"
    >
      查询
    </Button>
  </FormItem></div>,
    tab3: <div><Form.Item name="title" label="电影名称">
    <Input placeholder="全选" />
  </Form.Item>
  <FormItem>
    <Button
      size="large"
      loading={submitting}
      className={styles.submit}
      type="primary"
      htmlType="submit"
    >
      查询
    </Button>
  </FormItem></div>,
    tab4: <div><Form.Item name="type" label="排行方式">
    <Select>
      <Select.Option value="1">导演之间合作</Select.Option>
      <Select.Option value="2">演员之间合作</Select.Option>
      <Select.Option value="3">导演与演员合作</Select.Option>
      <Select.Option value="All">任意</Select.Option>
    </Select>
  </Form.Item>
  <Form.Item name="pid" label="与某人相关">
    <Input placeholder="可选" />
  </Form.Item>
  <FormItem>
    <Button
      size="large"
      loading={submitting}
      className={styles.submit}
      type="primary"
      htmlType="submit"
    >
      查询
    </Button>
  </FormItem></div>,
  };

  const dispatchList = {
      tab1: 'movie/conditionQuery',
      tab2: 'movie/versionQuery',
      tab3: 'movie/reviewQuery',
      tab4: 'movie/corrQuery',
  };

  const onFinish = values => {
    dispatch({
      type: dispatchList[currentTab],
      payload: { ...values },
    }).then(response => {
      console.log(movieList1);
    });
  };

  const rangeConfig = {
    rules: [
      {
        type: 'array',
      },
    ],
  };
  const formatConfig = {
    rules: [
      {
        labelAlign: 'left',
      },
    ],
  };
  return (
    <div>
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              tabList={tabList}
              activeTabKey={currentTab}
              onTabChange={newTab => {
                dispatch({
                  type: 'movie/onTabChange',
                  payload: newTab,
                });
              }}
            >
              {/* <h3>电影条件搜索</h3> */}
              <Form
                form={form}
                name="UserRegister"
                onFinish={onFinish}
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  offset: 2,
                  span: 14,
                }}
              >
                {contentList[currentTab]}
              </Form>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card tabList={tabList2}
              activeTabKey={currentTab2}
              onTabChange={newTab => {
                dispatch({
                  type: 'movie/onTabChange2',
                  payload: newTab,
                });
              }}>
              <h3>搜索与统计结果</h3>
              <TableBasic />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </div>
  );
};

export default connect(mapStateToProps)(Register);
