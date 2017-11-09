import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Button, Menu, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
const SubMenu = Menu.SubMenu;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            combo: {},
            openKeys: [],
            error: '',
            errorHash: '',
            name: '',
            rootSubmenuKeys: [],
            visible: false,
            hash: '',
            editId: ''
        };
    }

    onOpenChange(openKeys) {
        let { rootSubmenuKeys } = this.state;
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }


    add(){
        const name = this.state.name;
        if(name === ''){
            this.setState({error: 'Введите название'});
        }else{
            let value = this.state.combo;
            value[name] = [];
            this.setState({combo: value, name: '', error: ''});
        }


    }
    addHash(e){
        const name = this.state.hash;
        if(name === ''){
            this.setState({errorHash: 'Введите название'});
        }else{
            const hashName = '#'+name;
            const id = this.state.editId;
            let data = this.state.combo;
            data[id].push(hashName);
            this.setState({combo: data, hash: '', errorHash: ''});
        }
    }

    onChandeHundler(e){
        this.setState({name: e.target.value });
    }
    onChandeHundlerHash(e){
        this.setState({hash: e.target.value });
    }

    showModal(e){
        this.setState({
            visible: true,
            editId: e.target.id
        });
    }
    handleOk(e) {
        this.setState({
            visible: false,
        });
    }
    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }

    renderSub(value, key){
      return (
          <Menu.Item key={value+key}>
              { value }
          </Menu.Item>
      );
    }


    renderList(value, key){

        if (value.length > 0){
            return (
              <SubMenu
                key={key}
                title={<span><Icon id={key}  onClick={ this.showModal.bind(this) } type="edit" /><span>
                  { key }
                  </span></span>}>{value.map(this.renderSub.bind(this))}
             </SubMenu>

            );
        }else{
            return (
            <Menu.Item key={key}>
                <Icon id={key}  onClick={ this.showModal.bind(this) } type="edit" />
                { key }
            </Menu.Item>
            );
        }
    }

    render(){
        const { combo } = this.state;
            return(
                <div>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <Input onChange={ this.onChandeHundlerHash.bind(this) } value={this.state.hash} placeholder="Введите хеш тег" />
                        <Button onClick={ this.addHash.bind(this) } >Добавить тег</Button>
                        <div style={{ color:'red' }}>{ this.state.errorHash !== '' ? this.state.errorHash : null }</div>
                    </Modal>
                    <div  style={{ margin: 'auto', width: 420 }}>
                        <Input style={{ width: 200, float: 'left' }} onChange={ this.onChandeHundler.bind(this) } value={this.state.name} placeholder="Введите название комбо" />
                        <Button style={{ width: 200, float: 'right' }} onClick={ this.add.bind(this) } >Добавить комбо</Button>
                        <div style={{ color:'red' }}>{ this.state.error !== '' ? this.state.error : null }</div>
                        <Menu
                            mode="inline"
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange.bind(this)}
                            style={{ height: 300, overflowY: 'scroll' }}
                        >
                            { Object.keys(combo).map((value, key)=>{
                                return this.renderList.bind(this)(combo[value], value)
                            })}
                        </Menu>
                    </div>
                </div>
            );
    }
}
ReactDOM.render(<App/>, document.getElementById('app'));

