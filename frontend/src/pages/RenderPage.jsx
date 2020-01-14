import React from 'react'

import ContentHeader from '../common/template/ContentHeader'
import Content from '../common/template/Content'
import Tabs from '../common/tab/Tabs';
import TabsHeader from '../common/tab/TabsHeader';
import TabsContent from '../common/tab/TabsContent';
import TabHeader from '../common/tab/TabHeader';
import TabContent from '../common/tab/TabContent';
import { TAB_CREATE, TAB_DELETE, TAB_UPDATE, TAB_LIST, TAB_FOTO } from "./consts";

export default function RenderPage({ title, small, List, Foto, Form, create, update, remove, foto, init }) {

    return (
        <div>
            <ContentHeader title={title} small={small} />
            <Content>
                <Tabs>
                    <TabsHeader>
                        <TabHeader label='Listar' icon='bars' target={TAB_LIST} />
                        <TabHeader label='Incluir' icon='plus' target={TAB_CREATE} />
                        <TabHeader label='Alterar' icon='pencil' target={TAB_UPDATE} />
                        <TabHeader label='Excluir' icon='trash-o' target={TAB_DELETE} />
                        <TabHeader label='Foto' icon='camera' target={TAB_FOTO} />
                    </TabsHeader>
                    <TabsContent>
                        <TabContent id={TAB_LIST}>
                            <List />
                        </TabContent>
                        <TabContent id={TAB_CREATE}>
                            <Form onSubmit={create}
                                submitLabel='Incluir'
                                submitClass='primary' />
                        </TabContent>
                        <TabContent id={TAB_UPDATE}>
                            <Form onSubmit={update}
                                submitLabel='Alterar'
                                submitClass='info' />
                        </TabContent>
                        <TabContent id={TAB_DELETE}>
                            <Form onSubmit={remove}
                                readOnly={true}
                                submitLabel='Excluir'
                                submitClass='danger' />
                        </TabContent>
                        <TabContent id={TAB_FOTO}>
                            <Foto />
                        </TabContent>
                    </TabsContent>
                </Tabs>
            </Content>
        </div >
    )
}



// import React from 'react'

// import ContentHeader from '../common/template/ContentHeader'
// import Content from '../common/template/Content'
// import Tabs from '../common/tab/Tabs';
// import TabsHeader from '../common/tab/TabsHeader';
// import TabsContent from '../common/tab/TabsContent';
// import TabHeader from '../common/tab/TabHeader';
// import TabContent from '../common/tab/TabContent';
// import { TAB_CREATE, TAB_DELETE, TAB_UPDATE, TAB_LIST } from "./consts";

// export default function RenderPage({ title, small, List, Form, create, update, remove, init }) {

//     return (
//         <div>
//             <ContentHeader title={title} small={small} />
//             <Content>
//                 <Tabs>
//                     <TabsHeader>
//                         <TabHeader label='Listar' icon='bars' target={TAB_LIST} />
//                         <TabHeader label='Incluir' icon='plus' target={TAB_CREATE} />
//                         <TabHeader label='Alterar' icon='pencil' target={TAB_UPDATE} />
//                         <TabHeader label='Excluir' icon='trash-o' target={TAB_DELETE} />
//                     </TabsHeader>
//                     <TabsContent>
//                         <TabContent id={TAB_LIST}>
//                             <List />
//                         </TabContent>
//                         <TabContent id={TAB_CREATE}>
//                             <Form onSubmit={create}
//                                 submitLabel='Incluir'
//                                 submitClass='primary' />
//                         </TabContent>
//                         <TabContent id={TAB_UPDATE}>
//                             <Form onSubmit={update}
//                                 submitLabel='Alterar'
//                                 submitClass='info' />
//                         </TabContent>
//                         <TabContent id={TAB_DELETE}>
//                             <Form onSubmit={remove}
//                                 readOnly={true}
//                                 submitLabel='Excluir'
//                                 submitClass='danger' />
//                         </TabContent>
//                     </TabsContent>
//                 </Tabs>
//             </Content>
//         </div >
//     )
// }
