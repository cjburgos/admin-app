<template>
    <div class='container' id='walletStats'>
            <h1 class="title is-4"> Wallet Quick Statistics </h1>
            <div class="table-container">
                <table class="table is-bordered is-stripped">
                    <thead>
                    <tbody>
                        <tr>
                            <th v-for="header in headers" :key="header">{{ header }}</th>
                        </tr>
                        <tr>
                            <td> {{ wallet_name }} </td>
                            <td> {{ calculateConnections() }} </td> 
                            <td> {{ calculateCredentials() }} </td> 
                            <td> {{ calculateDIDs() }} </td>
                            <td> {{ wallet_status() }} </td>
                            <td> {{ wallet_location }} </td>
                            <td> {{ wallet_create_date }} </td>
                        </tr>
                    </tbody>
                    </thead>
                </table>
            </div>
        </div>
</template>
<script>

export default {
    name:'WalletStats',
    data(){
        return {
            wallet_name: 'MyWallet',
            wallet_status: () => {
                return this.wallet_name === 'MyWallet' ? 'active' : 'idle'
            },
            wallet_location: 'Washington, DC',
            wallet_create_date: new Date(),
            headers:[
                'Wallet Name',
                'Connections',
                'Credentials',
                'DIDs',
                'Status',
                'Location',
                'Created On'
            ],
            wallet_content:{
                dids:[
                    {
                        did:'wwww',
                        verkey:'dasfasfdsfds'
                    },
                    {
                        did:'wwww',
                        verkey:'dasfasfdsfds'
                    },
                    {
                        did:'wwww',
                        verkey:'dasfasfdsfds'
                    },
                    {
                        did:'wwww',
                        verkey:'dasfasfdsfds'
                    }
                ],
                connections:[
                    {
                        id:'1',
                        pairwise:'fsdfsdf',
                        label:'Anton'
                    },
                    {
                        id:'2',
                        pairwise:'xtytuss',
                        label:'Bravo'
                    },
                    {
                        id:'3',
                        pairwise:'htytytb',
                        label:'Charlie'
                    }                  
                ],
                credentials:[
                    {
                        id:'001',
                        cred_def:'xtytuss:CL:10:DriverLicense',
                        attributes:[
                            {
                                name:'First_Name',
                                value: 'Carlo'
                            },
                            {
                                name:'Last_Name',
                                value: 'Burgos'
                            },
                            {
                                name:'Category',
                                value: '5'
                            },
                        ]
                    }
                ]
            }    
        }
    },
    methods:{
        calculateConnections(){ 
            return this.wallet_content.connections.length
        },
        calculateCredentials(){
            return this.wallet_content.credentials.length
        },
        calculateDIDs(){
            return this.wallet_content.dids.length
        }
    },
    components:{

    }
}
</script>
<style lang=scss scoped>
    h1{
        text-align:left;
    }
    $table-body-background-color:white;
    $table-cell-border:1px solid ;

</style>