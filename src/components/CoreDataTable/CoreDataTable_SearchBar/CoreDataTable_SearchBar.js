import React, {Component, PropTypes} from 'react';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
const FormItem = Form.Item;

class CoreDataTable_SearchBar extends Component {

    constructor(props) {
        super(props);

    };

    render() {
        console.log(this.props.columns)
        return (
            <div style={{ padding: '30px' }}>
                <Form horizontal className="ant-advanced-search-form">
                    <Row>
                        {
                            this.props.columns.map((column) => {
                                return <Col key={column.field} span={6} md={4} xs={12}>
                                    <FormItem key={column.field}
                                        label={column.displayName}
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}
                                        >
                                        <Input placeholder={column.displayName} size="default"  />
                                    </FormItem>
                                </Col>
                            })
                        }
<Col span={12}  style={{ textAlign: 'left' }}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '20px' }}>搜索</Button>
                            <Button>清除条件</Button>
                        </Col>
                    </Row>
                    <Row>
                        
                    </Row>
                </Form>
            </div>
        );
    }
}

CoreDataTable_SearchBar.propTypes = {
    columns: React.PropTypes.array.isRequired
};

export default CoreDataTable_SearchBar;