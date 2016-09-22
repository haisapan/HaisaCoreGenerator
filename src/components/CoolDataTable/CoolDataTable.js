// import {DataTable } from 'antd/lib/';
// import 'antd/dist/antd.css'; 

import { Table, Icon } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  width: '40%',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  width: '30%',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  width: '30%',
}];

const data = [{
  key: 1,
  name: 'a',
  age: 32,
  address: '我是a',
  children: [{
    key: 11,
    name: 'aa',
    age: 33,
    address: '我是aa',
  }, {
    key: 12,
    name: 'ab',
    age: 33,
    address: '我是ab',
    children: [{
      key: 121,
      name: 'aba',
      age: 33,
      address: '我是aba',
    }],
  }, {
    key: 13,
    name: 'ac',
    age: 33,
    address: '我是ac',
    children: [{
      key: 131,
      name: 'aca',
      age: 33,
      address: '我是aca',
      children: [{
        key: 1311,
        name: 'acaa',
        age: 33,
        address: '我是acaa',
      }, {
        key: 1312,
        name: 'acab',
        age: 33,
        address: '我是acab',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'b',
  age: 32,
  address: '我是b',
}];

import React, {Component, PropTypes} from 'react';

class CoolDataTable extends Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

CoolDataTable.propTypes = {

};

export default CoolDataTable;

// ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);