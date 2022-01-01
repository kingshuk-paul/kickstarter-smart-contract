import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import Web3 from "web3";

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
    console.log('Using Metamask provider');
} else {
    const provider = new Web3.providers.HttpProvider(process.env.INFURA_RINKEBY_URL);
    web3 = new Web3(provider);
    console.log('Using INFURA provider');
};

export default web3;