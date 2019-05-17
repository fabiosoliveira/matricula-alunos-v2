import React from 'react'

import ContentHeader from '../common/template/ContentHeader'
import Content from '../common/template/Content'
import Tabs from '../common/tab/Tabs';
import TabsHeader from '../common/tab/TabsHeader';
import TabsContent from '../common/tab/TabsContent';
import TabHeader from '../common/tab/TabHeader';
import TabContent from '../common/tab/TabContent';

export default function RenderPage({ title, small, List, Form, create, update, remove }) {
    return (
        <div>
            <ContentHeader title={title} small={small} />
            <Content>
                <Tabs>
                    <TabsHeader>
                        <TabHeader label='Listar' icon='bars' target='tabList' />
                        <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                        <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                        <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                    </TabsHeader>
                    <TabsContent>
                        <TabContent id='tabList'>
                            <List />
                        </TabContent>
                        <TabContent id='tabCreate'>
                            <Form onSubmit={create}
                                submitLabel='Incluir'
                                submitClass='primary' />
                        </TabContent>
                        <TabContent id='tabUpdate'>
                            <Form onSubmit={update}
                                submitLabel='Alterar'
                                submitClass='info' />
                        </TabContent>
                        <TabContent id='tabDelete'>
                            <Form onSubmit={remove}
                                readOnly={true}
                                submitLabel='Excluir'
                                submitClass='danger' />
                        </TabContent>
                    </TabsContent>
                </Tabs>
            </Content>
        </div >
    )
}
