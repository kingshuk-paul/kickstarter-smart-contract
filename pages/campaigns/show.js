import React, { Component} from "react";
import Layout from "../../components/Layout";
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from '../../ethereum/web3';
import ContributeForm from "../../components/ContributeForm";
import {Link} from '../../routes';



class CampaignShow extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        return {
            address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards () {

        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'Manager created this campaign',
                style: { overflowWrap: 'break-word'} 
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (Wei)',
                description: 'Minimum contribution needed to become an approver'
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from contract. Request must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people that have donated to this campaign',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'Amount of money this campaign has left to spend'
            },
        ];

        return <Card.Group items={items} />;
    }

    render () {
        return (
            <Layout>
                <h3>Details of Campaign: {this.props.address}</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link> 
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;