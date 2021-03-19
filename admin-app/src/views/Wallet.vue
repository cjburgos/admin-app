<template>
    <div class='container' id='mainWallet'>
        <div class='columns is-centered'>
            <div class='column is-10' id='walletStats'>
                <WalletStats/>
            </div>
            <div class='column is-2' id='walletActions'>
                <WalletActions/>
            </div>
        </div>
    </div>
</template>
<script>

import WalletStats from '../components/Wallets/WalletStats';
import WalletActions from '../components/Wallets/WalletActions';

export default {
    name:'Wallet',
    
    components:{
        WalletStats,
        WalletActions
    }
}
</script>
<style lang=scss scoped>
    .column{
        border: 1px solid rgba(198, 200, 202, 0.75);
        border-width:0.5px;
        padding:15px;
        margin:10px;
    }
</style>