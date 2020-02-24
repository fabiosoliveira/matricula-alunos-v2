import React from "react";
// import axios from 'axios'
import ContentHeader from "../../common/template/ContentHeader";
import Content from "../../common/template/Content";
// import ValueBox from '../common/widget/ValueBox'
import Row from "../../common/layout/Row";

//const BASE_URL = 'http://localhost:3003/api'

const Dashboard2 = () => {
  // constructor(props) {
  //   super(props)
  //   this.state = { credit: 0, debt: 0 }
  // }

  // componentWillMount() {
  //   axios.get(`${BASE_URL}/billingCycles/summary`)
  //       .then(resp => this.setState(resp.data))
  // }

  // const { credit, debt } = this.state
  return (
    <div>
      <ContentHeader title="Dashboard" small="Versão 2.0" />
      <Content>
        <Row>
          <h1>Dashboard2</h1>
        </Row>
      </Content>
    </div>
    // <div>
    //   <ContentHeader title='Dashboard' small='Versão 2.0' />
    //   <Content>
    //     <Row>
    //       <ValueBox cols='12 4' color='green' icon='bank'
    //         value={`R$ ${credit}`} text='Total de Créditos' />
    //       <ValueBox cols='12 4' color='red' icon='credit-card'
    //         value={`R$ ${debt}`} text='Total de Débitos' />
    //       <ValueBox cols='12 4' color='blue' icon='money'
    //         value={`R$ ${credit - debt}`} text='Valor
    //         Consolidado' />
    //     </Row>
    //   </Content>
    // </div>
  );
};

export default Dashboard2;
