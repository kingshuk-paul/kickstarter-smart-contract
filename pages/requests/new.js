import React, {Component} from 'react';
import Layout from '../../components/Layout';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import {Link, Router} from '../../routes';


class newRequest extends Component {
    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }

    state = {
        value:'',
        description:'',
        recipient:'',
        loading: false,
        errorMessage:''
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});
        
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);
            await campaign.methods.createRequest(
                this.state.description,
                web3.utils.toWei(this.state.value, 'ether'),
                this.state.recipient
            ).send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({errorMessage: err.message});
        };
        this.setState({loading: false});
    };


    render(){
        return(
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a new Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event => {this.setState({description: event.target.value})}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => {this.setState({value: event.target.value})}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input                             
                            value={this.state.recipient}
                            onChange={event => {this.setState({recipient: event.target.value})}}
                        />
                    </Form.Field>      
                    <Message error header="Something went wrong"
                        content = {this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create!</Button>          
                </Form>
            </Layout>
        );
    }
}


export default newRequest