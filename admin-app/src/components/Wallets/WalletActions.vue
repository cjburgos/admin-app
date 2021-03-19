<template>
    <div class='container'>
        <h1 class="title is-4"> Wallet Actions </h1>
        <div class="columns is-centered">
            <div class="column">
                <button class="button" id="createWalletButton">Create</button>
            </div>
            <div class="column">
                <button class="button" id="exportWalletButton">Export</button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'WalletActions',
    data(){
        return {
            wallet_name: 'MyWallet',
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
    components:{

    }
}
</script>
<style lang=scss scoped>
    h1{
        text-align: left;
    }
    #createWalletButton{
        background-color:rgb(22, 39, 39);
        border-color:rgb(22, 39, 39);
        color: white;
    }
    #exportWalletButton{
        background-color:rgb(22, 39, 39);
        border-color:rgb(22, 39, 39);
        color: white;
    }
</style>