import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'

import NFT from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export interface IPFSDetails {
    fileUrl: string
    name: string
    description: string
}

const client = ipfsHttpClient(`https://ipfs.infura.io:5001/api/v0`)

export const lockAddress = '0xB9D6540ef2438677F853136a324527f28f06084F'

export const getProvider = async (): Promise<ethers.providers.Web3Provider> => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    return new ethers.providers.Web3Provider(connection)
}

export const addFileToIPFS = async (entry: any): Promise<string> => {
    const added = await client.add(entry)
    return `https://ipfs.infura.io/ipfs/${added.path}`
}

export const uploadToIPFS = async (ipfsDetails: IPFSDetails) => {
    const { name, description, fileUrl: image } = ipfsDetails
    const data = JSON.stringify({ name, description, image })
    try {
        const url = await addFileToIPFS(data)
        return url
    } catch (e) {
        console.log(e)
    }
}

export const createItem = async (url: string, _price: string) => {
    const provider = await getProvider()
    const signer = provider.getSigner()

    const price = ethers.utils.parseUnits(_price, 'ether')
    let contract = new ethers.Contract(lockAddress, NFT.abi, signer)

    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()

    let transaction = await contract.createToken(url, price, {
        value: listingPrice,
    })

    let tx = await transaction.wait()
    return tx
}
